import { fetchProblems, fetchContests, fetchGymContests } from './codeforces';
import { buildDailyMessageData } from './selection';
import { formatDailyMessage } from './formatter';

/**
 * Script standalone para testes.
 * Não depende do Discord (não exige DISCORD_TOKEN nem CHANNEL_ID),
 * apenas consulta a API do Codeforces, monta a seleção do dia
 * e imprime a mensagem final no terminal.
 *
 * Uso:
 *   npm run preview
 */
async function main() {
  console.log('[preview] Baixando problemas e contests do Codeforces...');

  const [problems, regularContests, gymContests] = await Promise.all([
    fetchProblems(),
    fetchContests(),
    fetchGymContests(),
  ]);

  console.log(
    `[preview] ${problems.length} problemas, ${regularContests.length} contests e ${gymContests.length} gyms carregados.`
  );

  const data = buildDailyMessageData(problems, regularContests, gymContests);
  const message = formatDailyMessage(data);

  console.log('\n--- Mensagem gerada ---\n');
  console.log(message);
  console.log('\n-----------------------');
}

main().catch((error) => {
  console.error('[preview] Erro ao gerar preview:', error);
  process.exit(1);
});
