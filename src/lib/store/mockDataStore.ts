import { create } from 'zustand';

export type ImpactCategory = {
  id: string;
  name: string;
};

export type SMENote = {
  author: string;
  credential: string;
  text: string;
};

export type Proposal = {
  id: string;
  title: string;
  abstract: string;
  eli5: string;
  smeNotes: SMENote[];
  status: 'active' | 'closed' | 'pending';
  deadline: string;
  impactMatrix: {
    helps: ImpactCategory[];
    hurts: ImpactCategory[];
    costs: ImpactCategory[];
  };
  metrics: {
    totalVotes: number;
    approvalRate: number;
  };
  dimensionalFeedback: {
    fairness: number;
    feasibility: number;
    economicImpact: number;
    environmentalImpact: number;
  };
};

export type CohortSentiment = {
  name: string;
  approval: number;
};

export type CommunitySentiment = {
  ageGroups: CohortSentiment[];
  economicStatus: CohortSentiment[];
  educationLevels: CohortSentiment[];
};

export type ConsensusPoint = {
  topic: string;
  agreementLevel: number;
  groups: string[];
};

interface MockDataState {
  proposals: Proposal[];
  communitySentiment: CommunitySentiment;
  topConcerns: string[];
  consensusPoints: ConsensusPoint[];
}

export const useMockDataStore = create<MockDataState>(() => ({
  proposals: [
    {
      id: "1",
      title: "Reforma do Elevado do Rio Tavares",
      abstract: "O elevado do Rio Tavares frequentemente sofre com engarrafamentos na temporada de verão. Esta proposta envolve a expansão das vias laterais, adição de uma ciclovia protegida e re-sincronização dos semáforos da rodovia SC-405 para melhorar o fluxo em 30%. O custo será pago via IPTU das áreas comerciais adjacentes.",
      eli5: "Sabe aquele trânsito horrível perto do Rio Tavares no verão? A ideia é alargar a rua, colocar uma ciclovia segura e ajustar os semáforos para tudo fluir melhor. Quem pega a SC-405 todo dia vai sentir a diferença. O dinheiro vem de um aumento no imposto dos comércios da região.",
      smeNotes: [
        {
          author: "Prof. Dr. Ana Beatriz Lemos",
          credential: "Engenharia de Tráfego, UFSC",
          text: "O modelo de microsimulação VISSIM indica que a re-sincronização dos semáforos, combinada com a expansão viária, pode gerar uma redução de 28-34% no tempo médio de viagem no trecho, alinhado com a projeção da proposta."
        },
        {
          author: "Dr. Carlos Montenegro",
          credential: "Economia Urbana, UDESC",
          text: "O aumento localizado do IPTU comercial é uma estratégia comum em value capture urbano. No entanto, deve-se considerar o impacto nos pequenos comerciantes durante o período de obra."
        }
      ],
      status: "active",
      deadline: "2026-04-20",
      impactMatrix: {
        helps: [{ id: "h1", name: "Moradores do Sul da Ilha" }, { id: "h2", name: "Ciclistas e Pedestres" }, { id: "h3", name: "Turismo no Verão" }],
        hurts: [{ id: "hu1", name: "Comércio Local durante a obra" }, { id: "hu2", name: "Áreas Verdes (corte de 15 árvores)" }],
        costs: [{ id: "c1", name: "R$ 15 Milhões (Aumento IPTU Comercial)" }, { id: "c2", name: "Transtorno no trânsito por 6 meses" }]
      },
      metrics: {
        totalVotes: 1450,
        approvalRate: 68,
      },
      dimensionalFeedback: {
        fairness: 62,
        feasibility: 78,
        economicImpact: 55,
        environmentalImpact: 40,
      }
    },
    {
      id: "2",
      title: "Revitalização do Centro Histórico (Ipê Center)",
      abstract: "Transformar as ruas ao redor da Praça XV e Mercado Público em calçadões exclusivos para pedestres aos fins de semana. O projeto integra painéis solares na iluminação pública e subsidia quiosques para feirantes orgânicos. A verba vem de reduções fiscais revogadas para indústrias poluentes.",
      eli5: "Imagine poder andar a pé pelo centro de Floripa sem se preocupar com carros nos fins de semana! As ruas perto da Praça XV viram calçadões, com luzinhas solares e barraquinhas de comida orgânica. O dinheiro vem de impostos que antes eram dados como desconto para fábricas que poluem.",
      smeNotes: [
        {
          author: "Arq. Marina Cardoso",
          credential: "Urbanismo Sustentável, Prefeitura de Florianópolis",
          text: "Projetos similares em Curitiba e Barcelona mostram aumento de 40-60% no fluxo de pedestres e incremento de 25% no faturamento do comércio local após 18 meses de calçadão implantado."
        }
      ],
      status: "active",
      deadline: "2026-04-25",
      impactMatrix: {
        helps: [{ id: "h1", name: "Feirantes e Empreendedores Locais" }, { id: "h2", name: "Turistas e Famílias" }],
        hurts: [{ id: "hu1", name: "Moradores com garagens na área" }, { id: "hu2", name: "Indústrias poluentes" }],
        costs: [{ id: "c1", name: "R$ 4.2 Milhões" }, { id: "c2", name: "Perda de 120 vagas rotativas de carro" }]
      },
      metrics: {
        totalVotes: 3200,
        approvalRate: 85,
      },
      dimensionalFeedback: {
        fairness: 80,
        feasibility: 72,
        economicImpact: 75,
        environmentalImpact: 88,
      }
    },
    {
      id: "3",
      title: "Passe Livre Estudantil Integral",
      abstract: "Garantir gratuidade no transporte coletivo de Florianópolis a todos os estudantes universitários e do ensino médio, todos os dias da semana. Atualmente restrito apenas aos dias letivos, a expansão incentiva a mobilidade sustentável nos fins de semana.",
      eli5: "Hoje, estudante só tem passe grátis nos dias de aula. A proposta é liberar o ônibus de graça pro estudante todos os dias, incluindo final de semana. Assim mais gente larga o carro, o que é bom pro meio ambiente. Mas pode deixar a passagem de quem não é estudante um pouco mais cara.",
      smeNotes: [
        {
          author: "Prof. Ricardo Alves",
          credential: "Mobilidade Urbana, UFSC",
          text: "A extensão do passe livre pode reduzir em 8-12% o uso de veículos particulares por jovens aos fins de semana, com impacto positivo na emissão de CO₂. No entanto, o subsídio anual de R$ 9M requer fonte fiscal sustentável."
        },
        {
          author: "Econ. Fernanda Guimarães",
          credential: "Consultora em Transporte Público",
          text: "A elasticidade-preço do transporte público para jovens é alta. A gratuidade não apenas incentiva o uso do ônibus, mas também gera receita indireta via consumo no comércio local."
        }
      ],
      status: "active",
      deadline: "2026-04-30",
      impactMatrix: {
        helps: [{ id: "h1", name: "Estudantes em vulnerabilidade social" }, { id: "h2", name: "Meio ambiente (menos carros)" }],
        hurts: [{ id: "hu1", name: "Usuários não-estudantes (potencial aumento da tarifa geral)" }],
        costs: [{ id: "c1", name: "Subsídio de R$ 9 Milhões/ano" }]
      },
      metrics: {
        totalVotes: 8900,
        approvalRate: 51,
      },
      dimensionalFeedback: {
        fairness: 48,
        feasibility: 60,
        economicImpact: 35,
        environmentalImpact: 82,
      }
    }
  ],
  communitySentiment: {
    ageGroups: [
      { name: "18-24", approval: 82 },
      { name: "25-40", approval: 65 },
      { name: "41-60", approval: 45 },
      { name: "60+", approval: 30 }
    ],
    economicStatus: [
      { name: "Baixa Renda", approval: 78 },
      { name: "Classe Média", approval: 55 },
      { name: "Alta Renda", approval: 35 }
    ],
    educationLevels: [
      { name: "Ensino Médio", approval: 65 },
      { name: "Graduação", approval: 60 },
      { name: "Pós-graduação", approval: 58 }
    ]
  },
  topConcerns: [
    "Mobilidade e Trânsito no Sul da Ilha",
    "Falta de áreas verdes no ecossistema urbano",
    "Custo flutuante da passagem de ônibus",
    "Poluição da Lagoa da Conceição",
    "Gentrificação e custo de moradia no centro",
    "Acessibilidade digital para idosos"
  ],
  consensusPoints: [
    {
      topic: "Necessidade de ciclovias protegidas",
      agreementLevel: 89,
      groups: ["18-24", "25-40", "41-60", "Baixa Renda", "Classe Média"]
    },
    {
      topic: "Preservação das áreas verdes urbanas",
      agreementLevel: 92,
      groups: ["Todas as faixas etárias", "Todos os níveis econômicos"]
    },
    {
      topic: "Transparência nos gastos públicos",
      agreementLevel: 95,
      groups: ["Progressistas", "Moderados", "Conservadores"]
    },
    {
      topic: "Apoio ao comércio local vs grandes redes",
      agreementLevel: 78,
      groups: ["Baixa Renda", "Classe Média", "25-40", "41-60"]
    }
  ]
}));
