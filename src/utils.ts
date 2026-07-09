export function pickRandom<T>(arr: T[]): T | null {
  if (arr.length === 0) return null;
  return arr[Math.floor(Math.random() * arr.length)];
}

export function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

export function buildProblemUrl(contestId: number, index: string): string {
  return `https://codeforces.com/problemset/problem/${contestId}/${index}`;
}

export function buildContestUrl(contestId: number): string {
  return `https://codeforces.com/contest/${contestId}`;
}

export function buildGymUrl(contestId: number): string {
  return `https://codeforces.com/gym/${contestId}`;
}
