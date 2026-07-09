import { Problem, Contest, MessageData, RatingRange, SelectedContest } from './types';
import {
  filterProblemsByRating,
  filterContestsByNamePart,
  pickRandomProblem,
  pickRandomContest,
} from './codeforces';

export const RATING_RANGES: RatingRange[] = [
  { min: 800, max: 1200, emoji: '🟢', label: '800-1200' },
  { min: 1300, max: 1700, emoji: '🟡', label: '1300-1700' },
  { min: 1800, max: 2200, emoji: '🔴', label: '1800-2200' },
];

export function buildDailyMessageData(
  problems: Problem[],
  contests: Contest[],
  gymContests: Contest[]
): MessageData {
  const selectedProblems = RATING_RANGES.map((range) => {
    const candidates = filterProblemsByRating(problems, range.min, range.max);
    const problem = pickRandomProblem(candidates);
    return problem ? { range, problem } : null;
  }).filter((p): p is { range: RatingRange; problem: Problem } => p !== null);

  const div2Candidates = filterContestsByNamePart(contests, 'Div. 2');
  const div3Candidates = filterContestsByNamePart(contests, 'Div. 3');

  const selectedContests = (
    [
      { category: 'div2', contest: pickRandomContest(div2Candidates) },
      { category: 'div3', contest: pickRandomContest(div3Candidates) },
      { category: 'gym', contest: pickRandomContest(gymContests) },
    ] as { category: SelectedContest['category']; contest: Contest | null }[]
  ).filter((c): c is SelectedContest => c.contest !== null);

  return {
    date: new Date(),
    problems: selectedProblems,
    contests: selectedContests,
  };
}
