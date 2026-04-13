import { create } from 'zustand';
import { Proposal, UserVote } from '@/types';

interface MockStore {
  proposals: Proposal[];
  votes: Record<string, UserVote>;
  setVote: (proposalId: string, voteData: Omit<UserVote, 'proposalId'>) => void;
}

const INITIAL_PROPOSALS: Proposal[] = [
  {
    id: 'prop-1',
    title: 'Reduce Service Taxes, Increase Product Levies',
    abstract: 'A proposal to rebalance the municipal tax structure by lowering the ISS (services tax) by 2% and increasing ICMS equivalent local product levies by 1.5% to encourage local service economy growth.',
    eli5: 'Make services (like haircuts or consulting) cheaper to tax, but make physical goods slightly more expensive to balance the city budget.',
    impact: {
      helps: ['Local service workers', 'Freelancers', 'Digital nomads'],
      hurts: ['Retail stores', 'Importers'],
      costs: 'Neutral overall impact on municipal budget'
    }
  },
  {
    id: 'prop-2',
    title: 'Bioclimatic Zoning for Future Constructions',
    abstract: 'Implement mandatory green roof requirements and natural ventilation shafts for all new commercial buildings over 3 floors in the downtown perimeter region.',
    eli5: 'New tall office buildings must have plants on their roofs and be designed to let natural wind cool them down, saving AC electricity.',
    impact: {
      helps: ['Environmental health', 'Electric grid stability'],
      hurts: ['Construction companies (initial costs)', 'Real estate developers'],
      costs: 'Estimated 5% increase in initial construction costs'
    }
  },
  {
    id: 'prop-3',
    title: 'Community Gigabit Mesh Initiative',
    abstract: 'Deploy subsidized mesh networking nodes in underserved neighborhoods to create a decentralized municipal broadband framework supporting the Civic Intelligence platform.',
    eli5: 'Provide cheap internet routers to specific neighborhoods so everyone can get online and participate in these civic votes.',
    impact: {
      helps: ['Low-income students', 'Remote workers'],
      hurts: ['Existing ISPs (potentially)'],
      costs: 'R$ 2.5 million initial investment'
    }
  }
];

export const useMockStore = create<MockStore>((set) => ({
  proposals: INITIAL_PROPOSALS,
  votes: {},
  setVote: (proposalId, voteData) => 
    set((state) => ({
      votes: {
        ...state.votes,
        [proposalId]: { proposalId, ...voteData }
      }
    }))
}));
