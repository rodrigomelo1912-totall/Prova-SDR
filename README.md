# Totall Hub CFO

Painel interno para criar solicitacoes e consultar relatorios do Hub CFO, conectado ao board do Monday:

```text
https://totall.monday.com/boards/18421402809
```

## Rodar localmente

Crie um `.env` baseado em `.env.example` e configure:

```env
MONDAY_BOARD_ID=18421402809
MONDAY_API_TOKEN=
```

Depois rode:

```bash
npm start
```

Acesse:

```text
http://localhost:3000
```

## Deploy

O Teams exige uma URL publica em HTTPS; `localhost` nao funciona para outros usuarios.

Este projeto ja tem `render.yaml` para deploy em Render. No ambiente de producao configure:

```env
MONDAY_BOARD_ID=18421402809
MONDAY_API_TOKEN=<token do monday>
```

Depois do deploy, valide:

```text
https://sua-url-publica/health
```

## Publicar no Microsoft Teams

Com a URL publica do deploy em maos, gere o pacote do app:

```bash
npm run teams:package -- https://sua-url-publica
```

O pacote sera criado em:

```text
teams/dist/totall-hub-cfo-teams.zip
```

Para disponibilizar na empresa:

1. Abra o Microsoft Teams Admin Center.
2. Acesse `Teams apps` > `Manage apps`.
3. Use `Upload new app` e envie `teams/dist/totall-hub-cfo-teams.zip`.
4. Permita o app para os usuarios ou politicas desejadas.
5. Adicione o app como aba em um time/canal ou disponibilize como app pessoal.

## Alternativa rapida

Sem pacote de app, tambem e possivel adicionar a URL publicada como uma aba `Website` dentro de um canal do Teams. Essa opcao e mais simples, mas menos organizada para distribuir como app corporativo.
