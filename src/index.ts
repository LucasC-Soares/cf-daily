import { config } from './config';
import { fetchProblems, fetchContests, fetchGymContests } from './codeforces';
import { buildDailyMessageData } from './selection';
import { formatDailyMessage, buildDailyEmbed } from './formatter';
import { sendMessageToWebhook } from './webhook';

async function main() {
  console.log('[index] Baixando problemas e contests do Codeforces...');

  const [problems, regularContests, gymContests] = await Promise.all([
    fetchProblems(),
    fetchContests(),
    fetchGymContests(),
  ]);

  console.log(
    `[index] ${problems.length} problemas, ${regularContests.length} contests e ${gymContests.length} gyms carregados.`
  );

  const data = buildDailyMessageData(problems, regularContests, gymContests);
  const message = formatDailyMessage(data, config.roleId);
  const embed = buildDailyEmbed(message);

  console.log('[index] Enviando mensagem para o Discord (webhook)...');
  await sendMessageToWebhook(config.webhookUrl, embed);

  console.log('[index] Mensagem enviada com sucesso.');
}

main().catch((error) => {
  console.error('[index] Erro ao enviar a mensagem diária:', error);
  process.exit(1);
});
