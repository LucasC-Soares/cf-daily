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
  content: string | DiscordEmbed
): Promise<void> {
  await axios.post(webhookUrl, {
    ...(typeof content === 'string'
      ? { content }
      : {
          content: config.roleId ? `<@&${config.roleId}>` : undefined,
          embeds: [content],
        }),

    allowed_mentions: config.roleId
      ? {
          parse: [],
          roles: [config.roleId],
        }
      : {
          parse: [],
        },
  });
}