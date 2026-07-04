# Prova SDR

Prova online de conhecimentos SDR da Totall Propriedade Intelectual.

O app coleta as respostas, calcula automaticamente as questoes fechadas, registra a submissao no servidor e envia o resultado para Rodrigo via email quando o Microsoft Graph/Exchange estiver configurado.

## Rodar localmente

```bash
npm start
```

Abra:

```text
http://localhost:3000
```

## Variaveis de ambiente

Crie um `.env` baseado em `.env.example`.

```env
RESULT_RECIPIENT_EMAIL=rodrigo.melo@totallpi.co

MS_GRAPH_TENANT_ID=
MS_GRAPH_CLIENT_ID=
MS_GRAPH_CLIENT_SECRET=
MS_GRAPH_SENDER=rodrigo.melo@totallpi.co
```

Sem Microsoft Graph configurado, o app salva as provas em `data/submissions/` e libera o resultado com um protocolo local.

## Envio automatico por Microsoft Exchange

Para envio real online:

1. Crie um App Registration no Microsoft Entra ID.
2. Adicione a permissao `Microsoft Graph > Application permissions > Mail.Send`.
3. Conceda `Admin consent`.
4. Crie um client secret.
5. Configure no ambiente de producao:
   - `MS_GRAPH_TENANT_ID`
   - `MS_GRAPH_CLIENT_ID`
   - `MS_GRAPH_CLIENT_SECRET`
   - `MS_GRAPH_SENDER`
   - `RESULT_RECIPIENT_EMAIL`

O servidor usa `POST /users/{MS_GRAPH_SENDER}/sendMail` para enviar o resultado.

## Deploy

Este projeto precisa de hospedagem Node.js. GitHub Pages nao executa o servidor nem o envio de email.

Opcoes recomendadas:

- Render
- Railway
- Fly.io
- Azure App Service

O arquivo `render.yaml` ja deixa o deploy no Render preparado.

### Render

1. Acesse `https://dashboard.render.com/`.
2. Conecte a conta GitHub.
3. Crie um novo Blueprint ou Web Service apontando para `rodrigomelo1912-totall/Prova-SDR`.
4. Configure as variaveis sensiveis:
   - `MS_GRAPH_TENANT_ID`
   - `MS_GRAPH_CLIENT_ID`
   - `MS_GRAPH_CLIENT_SECRET`
5. Faça o deploy.

### Docker

```bash
docker build -t prova-sdr .
docker run --env-file .env -p 3000:3000 prova-sdr
```

### Healthcheck

```text
/health
```

Retorna um JSON simples confirmando que o servico esta online.
