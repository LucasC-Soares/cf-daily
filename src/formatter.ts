import { MessageData } from './types';
import { buildProblemUrl, buildContestUrl, buildGymUrl, formatDate } from './utils';
import { DiscordEmbed } from './types';

const CONTEST_LABELS: Record<string, { emoji: string; label: string }> = {
  div2: { emoji: '🏆', label: 'Div2' },
  div3: { emoji: '🥈', label: 'Div3' },
  gym: { emoji: '💪', label: 'Gym' },
};

export function formatDailyMessage(data: MessageData): string {
  const lines: string[] = [];

  lines.push('Para o dia de hoje, selecionamos os seguintes problemas para vocês praticarem, em ordem de dificuldade de acordo com seu rating:');
  lines.push('');

  for (const { range, problem } of data.problems) {
    lines.push(`${range.emoji} ${range.label}`);
    lines.push(`${problem.index}. ${problem.name}`);
    lines.push(buildProblemUrl(problem.contestId, problem.index));
    lines.push('');
  }

  lines.push('Além disso, temos os seguintes contests de Div2 e Div3 para hoje. ');
  lines.push('Praticar contest virtualmente é uma ótima forma de se preparar para os contests feitos ao vivo, recomendamos muito realizá-los caso você queria subir de rating e aprender a manusear o seu tempo:');
  lines.push('');
  
  for (const { category, contest } of data.contests) {
    const { emoji, label } = CONTEST_LABELS[category];
    if(category === 'gym') continue;
    const url = buildContestUrl(contest.id);

    lines.push(`${emoji} ${label}`);
    lines.push(contest.name);
    lines.push(url);
    lines.push('');
  }

  lines.push('E para quem gosta de desafios, temos também um contest de Gym');
  lines.push('Eles são ótimos para treinar problemas de nível mais avançado, e também são excelentes para treinar com a sua equipe para a ICPC. Muitos deles são de regionais passadas dos mais diversos países, sendo muito parecidos com os problemas que você vai encontrar na Maratona');
  lines.push('');

  for (const { category, contest } of data.contests) {
    const { emoji, label } = CONTEST_LABELS[category];
    if(category === 'gym') {
      const url = buildGymUrl(contest.id);
      lines.push(`${emoji} ${label}`);
      lines.push(contest.name);
      lines.push(url);
      lines.push('');
    }
  }

  return lines.join('\n').trim();
}

export function buildDailyEmbed(message: string): DiscordEmbed {
  const data = new Date();
  return {
    title: `📅 Challenge do dia — ${formatDate(data)}`,
    description: message,
    color: 0xB8860B,
  };
}