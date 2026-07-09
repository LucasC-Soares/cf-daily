import { MessageData } from './types';
import { buildProblemUrl, buildContestUrl, buildGymUrl, formatDate } from './utils';

const CONTEST_LABELS: Record<string, { emoji: string; label: string }> = {
  div2: { emoji: '🏆', label: 'Div2' },
  div3: { emoji: '🥈', label: 'Div3' },
  gym: { emoji: '💪', label: 'Gym' },
};

export function formatDailyMessage(data: MessageData): string {
  const lines: string[] = [];

  lines.push(`📅 Problemas do dia — ${formatDate(data.date)}`);
  lines.push('');

  for (const { range, problem } of data.problems) {
    lines.push(`${range.emoji} ${range.label}`);
    lines.push(`${problem.index}. ${problem.name}`);
    lines.push(buildProblemUrl(problem.contestId, problem.index));
    lines.push('');
  }

  for (const { category, contest } of data.contests) {
    const { emoji, label } = CONTEST_LABELS[category];
    const url = category === 'gym' ? buildGymUrl(contest.id) : buildContestUrl(contest.id);

    lines.push(`${emoji} ${label}`);
    lines.push(contest.name);
    lines.push(url);
    lines.push('');
  }

  return lines.join('\n').trim();
}
