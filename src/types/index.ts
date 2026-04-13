export interface Proposal {
  id: string;
  title: string;
  abstract: string;
  eli5: string;
  impact: {
    helps: string[];
    hurts: string[];
    costs: string;
  };
}

export interface UserVote {
  proposalId: string;
  fairness: number;
  feasibility: number;
  disapproveReasons: string[];
}
