import { create } from 'zustand';

export type ImpactCategory = {
  id: string;
  name: string;
};

export type Proposal = {
  id: string;
  title: string;
  abstract: string;
  impactMatrix: {
    helps: ImpactCategory[];
    hurts: ImpactCategory[];
    costs: ImpactCategory[];
  };
  metrics: {
    totalVotes: number;
    approvalRate: number;
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

interface MockDataState {
  proposals: Proposal[];
  communitySentiment: CommunitySentiment;
  topConcerns: string[];
}

export const useMockDataStore = create<MockDataState>(() => ({
  proposals: [
    {
      id: "1",
      title: "Reforma do Elevado do Rio Tavares",
      abstract: "O elevado do Rio Tavares frequentemente sofre com engarrafamentos na temporada de verão. Esta proposta envolve a expansão das vias laterais, adição de uma ciclovia protegida e re-sincronização dos semáforos da rodovia SC-405 para melhorar o fluxo em 30%. O custo será pago via IPTU das áreas comerciais adjacentes.",
      impactMatrix: {
        helps: [{ id: "h1", name: "Moradores do Sul da Ilha" }, { id: "h2", name: "Ciclistas e Pedestres" }, { id: "h3", name: "Turismo no Verão" }],
        hurts: [{ id: "hu1", name: "Comércio Local durante a obra" }, { id: "hu2", name: "Áreas Verdes (corte de 15 árvores)" }],
        costs: [{ id: "c1", name: "R$ 15 Milhões (Aumento IPTU Comercial)" }, { id: "c2", name: "Transtorno no trânsito por 6 meses" }]
      },
      metrics: {
        totalVotes: 1450,
        approvalRate: 68,
      }
    },
    {
      id: "2",
      title: "Revitalização do Centro Histórico (Ipê Center)",
      abstract: "Transformar as ruas ao redor da Praça XV e Mercado Público em calçadões exclusivos para pedestres aos fins de semana. O projeto integra painéis solares na iluminação pública e subsidia quiosques para feirantes orgânicos. A verba vem de reduções fiscais revogadas para indústrias poluentes.",
      impactMatrix: {
        helps: [{ id: "h1", name: "Feirantes e Empreendedores Locais" }, { id: "h2", name: "Turistas e Famílias" }],
        hurts: [{ id: "hu1", name: "Moradores com garagens na área" }, { id: "hu2", name: "Indústrias poluentes" }],
        costs: [{ id: "c1", name: "R$ 4.2 Milhões" }, { id: "c2", name: "Perda de 120 vagas rotativas de carro" }]
      },
      metrics: {
        totalVotes: 3200,
        approvalRate: 85,
      }
    },
    {
      id: "3",
      title: "Passe Livre Estudantil Integral",
      abstract: "Garantir gratuidade no transporte coletivo de Florianópolis a todos os estudantes universitários e do ensino médio, todos os dias da semana. Atualmente restrito apenas aos dias letivos, a expansão incentiva a mobilidade sustentável nos fins de semana.",
      impactMatrix: {
        helps: [{ id: "h1", name: "Estudantes em vulnerabilidade social" }, { id: "h2", name: "Meio ambiente (menos carros)" }],
        hurts: [{ id: "hu1", name: "Usuários não-estudantes (potencial aumento da tarifa geral)" }],
        costs: [{ id: "c1", name: "Subsídio de R$ 9 Milhões/ano" }]
      },
      metrics: {
        totalVotes: 8900,
        approvalRate: 51,
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
    "Poluição da Lagoa da Conceição"
  ]
}));
