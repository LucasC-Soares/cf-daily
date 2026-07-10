import axios from 'axios';
import { config } from './config';
import { DiscordEmbed } from './types';

/**
 * Envia uma mensagem para um canal do Discord via Webhook.
 * Não exige bot logado nem conexão persistente com o gateway —
 * é só uma requisição HTTP simples.
 */
export async function sendMessageToWebhook(
  webhookUrl: string,
  embed: DiscordEmbed
): Promise<void> {
  await axios.post(webhookUrl, {
    content: `<@&${config.roleId}>`,
    embeds: [embed],
    allowed_mentions: {
      parse: [],
      roles: [config.roleId],
    },
  });
}