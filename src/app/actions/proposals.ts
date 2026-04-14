"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getProposals() {
  const proposals = await prisma.proposal.findMany({
    include: {
      votes: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return proposals.map((p) => {
    // Calcular as métricas agregadas na hora
    const totalVotes = p.votes.length;
    // Uma aprovação é considerada "aprovada" se a justiça e viabilidade > 50 ... ou por padrão simplificado: (fairness + feasibility + econ + env) / 4 > 50
    // Para simplificar: consideramos a intenção do voto
    // Como a lógica mockada tinha "approvalRate", vamos mockar a conta baseada na média dimensional
    let approvalRate = 0;
    if (totalVotes > 0) {
      const avgScore = p.votes.reduce((acc, v) => acc + ((v.fairness + v.feasibility + v.economicImpact + v.environmentalImpact) / 4), 0) / totalVotes;
      approvalRate = Math.round(avgScore);
    } else {
      // Valor padrão caindo pro mock base para demonstração
      approvalRate = 0;
    }

    return {
      ...p,
      metrics: {
        totalVotes,
        approvalRate,
      },
    };
  });
}

export async function getProposalById(id: string) {
  const proposal = await prisma.proposal.findUnique({
    where: { id },
    include: {
      helps: true,
      hurts: true,
      costs: true,
      smeNotes: true,
      votes: true,
    },
  });

  if (!proposal) return null;

  const totalVotes = proposal.votes.length;
  let approvalRate = 0;
  
  const initialDimensional = {
    fairness: 0,
    feasibility: 0,
    economicImpact: 0,
    environmentalImpact: 0
  };

  if (totalVotes > 0) {
    const sums = proposal.votes.reduce((acc, v) => ({
      fairness: acc.fairness + v.fairness,
      feasibility: acc.feasibility + v.feasibility,
      economicImpact: acc.economicImpact + v.economicImpact,
      environmentalImpact: acc.environmentalImpact + v.environmentalImpact
    }), { fairness: 0, feasibility: 0, economicImpact: 0, environmentalImpact: 0 });

    initialDimensional.fairness = Math.round(sums.fairness / totalVotes);
    initialDimensional.feasibility = Math.round(sums.feasibility / totalVotes);
    initialDimensional.economicImpact = Math.round(sums.economicImpact / totalVotes);
    initialDimensional.environmentalImpact = Math.round(sums.environmentalImpact / totalVotes);

    approvalRate = Math.round((initialDimensional.fairness + initialDimensional.feasibility + initialDimensional.economicImpact + initialDimensional.environmentalImpact) / 4);
  }

  return {
    ...proposal,
    metrics: {
      totalVotes,
      approvalRate,
    },
    dimensionalFeedback: initialDimensional
  };
}

export async function submitVote(data: {
  proposalId: string;
  walletAddress: string;
  fairness: number;
  feasibility: number;
  economicImpact: number;
  environmentalImpact: number;
  disapprovalReasons?: string[];
  feedbackText?: string;
}) {
  
  // Garantir que o user exista (simulação ZKP Identity Registry)
  let user = await prisma.user.findUnique({ where: { walletAddress: data.walletAddress } });
  if (!user) {
    user = await prisma.user.create({
      data: {
        walletAddress: data.walletAddress,
        // Em um cenário on-chain, aqui viriam as proofs
      }
    });
  }

  await prisma.vote.upsert({
    where: {
      userId_proposalId: {
        userId: user.id,
        proposalId: data.proposalId,
      }
    },
    create: {
      userId: user.id,
      proposalId: data.proposalId,
      fairness: data.fairness,
      feasibility: data.feasibility,
      economicImpact: data.economicImpact,
      environmentalImpact: data.environmentalImpact,
      disapprovalReasons: data.disapprovalReasons ? JSON.stringify(data.disapprovalReasons) : null,
      feedbackText: data.feedbackText,
    },
    update: {
      fairness: data.fairness,
      feasibility: data.feasibility,
      economicImpact: data.economicImpact,
      environmentalImpact: data.environmentalImpact,
      disapprovalReasons: data.disapprovalReasons ? JSON.stringify(data.disapprovalReasons) : null,
      feedbackText: data.feedbackText,
    }
  });

  revalidatePath("/");
  revalidatePath(`/proposals/${data.proposalId}`);
  revalidatePath("/analytics");
  return { success: true };
}
