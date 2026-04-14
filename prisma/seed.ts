import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ log: ['info'] });

async function main() {
  console.log("Start seeding...");

  // Seed Proposals
  const props = [
    {
      title: "Reforma do Elevado do Rio Tavares",
      abstract: "O elevado do Rio Tavares frequentemente sofre com engarrafamentos na temporada de verão. Esta proposta envolve a expansão das vias laterais, adição de uma ciclovia protegida e re-sincronização dos semáforos da rodovia SC-405 para melhorar o fluxo em 30%. O custo será pago via IPTU das áreas comerciais adjacentes.",
      eli5: "Sabe aquele trânsito horrível perto do Rio Tavares no verão? A ideia é alargar a rua, colocar uma ciclovia segura e ajustar os semáforos para tudo fluir melhor. Quem pega a SC-405 todo dia vai sentir a diferença. O dinheiro vem de um aumento no imposto dos comércios da região.",
      status: "active",
      deadline: new Date("2026-04-20"),
    },
    {
      title: "Revitalização do Centro Histórico (Ipê Center)",
      abstract: "Transformar as ruas ao redor da Praça XV e Mercado Público em calçadões exclusivos para pedestres aos fins de semana. O projeto integra painéis solares na iluminação pública e subsidia quiosques para feirantes orgânicos. A verba vem de reduções fiscais revogadas para indústrias poluentes.",
      eli5: "Imagine poder andar a pé pelo centro de Floripa sem se preocupar com carros nos fins de semana! As ruas perto da Praça XV viram calçadões, com luzinhas solares e barraquinhas de comida orgânica. O dinheiro vem de impostos que antes eram dados como desconto para fábricas que poluem.",
      status: "active",
      deadline: new Date("2026-04-25"),
    },
    {
      title: "Passe Livre Estudantil Integral",
      abstract: "Garantir gratuidade no transporte coletivo de Florianópolis a todos os estudantes universitários e do ensino médio, todos os dias da semana. Atualmente restrito apenas aos dias letivos, a expansão incentiva a mobilidade sustentável nos fins de semana.",
      eli5: "Hoje, estudante só tem passe grátis nos dias de aula. A proposta é liberar o ônibus de graça pro estudante todos os dias, incluindo final de semana. Assim mais gente larga o carro, o que é bom pro meio ambiente. Mas pode deixar a passagem de quem não é estudante um pouco mais cara.",
      status: "active",
      deadline: new Date("2026-04-30"),
    }
  ];

  for (const p of props) {
    const created = await prisma.proposal.create({
      data: p
    });
    console.log(`Created proposal with id: ${created.id}`);
  }

  // Create a mock user
  const user = await prisma.user.create({
    data: {
      walletAddress: "0x7a3F...e92B",
      ageRange: "18-24",
      education: "graduacao",
      economicStatus: "media",
      politicalOrientation: "progressista"
    }
  });

  console.log(`Created mock user: ${user.walletAddress}`);

  console.log("Seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  });
