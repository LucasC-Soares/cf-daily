import axios from 'axios';
import { config } from './config';
import { APIEmbed } from 'discord.js';

/**
 * Envia uma mensagem para um canal do Discord via Webhook.
 * Não exige bot logado nem conexão persistente com o gateway —
 * é só uma requisição HTTP simples.
 */
export async function sendMessageToWebhook(
  webhookUrl: string,
  content: APIEmbed | string
): Promise<void> {
  await axios.post(webhookUrl, {
    content,
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