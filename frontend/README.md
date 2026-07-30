# Fala VR Frontend

Frontend inicial criado com Vite, React e TypeScript para consumir o backend NestJS deste repositório.

## Como visualizar localmente

1. Entre na pasta do frontend:

   ```bash
   cd frontend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure a URL base da API. Você pode copiar o exemplo:

   ```bash
   cp .env.example .env
   ```

   Por padrão, o arquivo usa:

   ```env
   VITE_API_URL=http://localhost:3000
   ```

   Altere esse valor se o backend estiver rodando em outra porta ou host.

4. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

5. Abra a URL exibida pelo Vite no terminal, normalmente:

   ```text
   http://localhost:5173
   ```

## Fluxo implementado

- O formulário de login chama `POST /signin`.
- O `access_token` retornado é armazenado no estado da aplicação.
- O botão de posts chama `GET /posts` enviando `Authorization: Bearer ${access_token}`.
- O cliente HTTP também expõe métodos para `/user`, `/user/:user_id`, `/posts` e `/posts/:post_id`.

> Observação: neste ambiente, não foi possível gerar uma captura de tela porque o registry retornou `403 Forbidden` ao instalar pacotes npm. Em uma máquina com acesso ao npm, os comandos acima devem abrir a aplicação no navegador.
