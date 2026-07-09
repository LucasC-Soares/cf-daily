import axios from 'axios';
import { Problem, Contest } from './types';
import { pickRandom } from './utils';

const CF_API_BASE = 'https://codeforces.com/api';

const EXCLUDED_TAGS = ['*special'];

export async function fetchProblems(): Promise<Problem[]> {
  const { data } = await axios.get(`${CF_API_BASE}/problemset.problems`);

  if (data.status !== 'OK') {
    throw new Error('Falha ao buscar problemas do Codeforces');
  }

  const problems: Problem[] = data.result.problems
    .map((p: any) => ({
      contestId: p.contestId,
      index: p.index,
      name: p.name,
      rating: p.rating,
      tags: p.tags ?? [],
    }))
    .filter((p: Problem) => !p.tags.some((tag) => EXCLUDED_TAGS.includes(tag)));

  return problems;
}

export async function fetchContests(gym: boolean = false): Promise<Contest[]> {
  const { data } = await axios.get(`${CF_API_BASE}/contest.list`, {
    params: gym ? { gym: true } : undefined,
  });

  if (data.status !== 'OK') {
    throw new Error('Falha ao buscar contests do Codeforces');
  }

  const contests: Contest[] = data.result.map((c: any) => ({
    id: c.id,
    name: c.name,
    phase: c.phase,
    startTimeSeconds: c.startTimeSeconds,
    type: c.type,
  }));

  return contests;
}

export async function fetchGymContests(): Promise<Contest[]> {
  return fetchContests(true);
}

export function filterProblemsByRating(
  problems: Problem[],
  min: number,
  max: number
): Problem[] {
  return problems.filter(
    (p) => p.rating !== undefined && p.rating >= min && p.rating < max
  );
}

export function filterContestsByNamePart(
  contests: Contest[],
  namePart: string
): Contest[] {
  return contests.filter((c) =>
    c.name.toLowerCase().includes(namePart.toLowerCase())
  );
}

export function pickRandomProblem(problems: Problem[]): Problem | null {
  return pickRandom(problems);
}

export function pickRandomContest(contests: Contest[]): Contest | null {
  return pickRandom(contests);
}
