export interface Problem {
  contestId: number;
  index: string;
  name: string;
  rating?: number;
  tags: string[];
}

export interface Contest {
  id: number;
  name: string;
  phase: string;
  startTimeSeconds?: number;
  type: string;
}

export type ContestCategory = 'div2' | 'div3' | 'gym';

export interface RatingRange {
  min: number;
  max: number;
  emoji: string;
  label: string;
}

export interface SelectedProblem {
  range: RatingRange;
  problem: Problem;
}

export interface SelectedContest {
  category: ContestCategory;
  contest: Contest;
}

export interface MessageData {
  date: Date;
  problems: SelectedProblem[];
  contests: SelectedContest[];
}
