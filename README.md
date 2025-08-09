# Formulário estilizado (Google Forms) + Landing Page

Este projeto cria:
- Um Google Form moderno com ramificação para Suporte ou Vendas, já integrado a uma planilha do Google Sheets.
- Uma landing page responsiva para apresentar o produto e incorporar o formulário por iframe.

## 1) Gerar o Google Form automaticamente
Você precisa executar um pequeno script no Google Apps Script (executa dentro da sua conta Google):

1. Acesse `https://script.google.com` e crie um novo projeto em branco.
2. Crie um arquivo chamado `CreateForm.gs` e cole o conteúdo de `apps-script/CreateForm.gs` deste repositório.
3. No menu, selecione Executar → `createProductContactForm` (a primeira execução pedirá permissões; aceite).
4. Ao finalizar, verifique o Log (Executar → Exibir registros) para copiar:
   - Form URL (link público para respostas)
   - Edit URL (link de edição)
   - Planilha de Respostas (ID/URL da planilha de destino)
5. Opcional: Abra o Form no Google Forms para ajustar tema, cor e imagem de cabeçalho.

Observações importantes:
- O formulário cria duas seções: Suporte e Vendas, com ramificação conforme a escolha do usuário.
- As respostas são enviadas automaticamente para uma nova planilha do Google Sheets que o script cria.
- O formulário valida email e tem barras de progresso.

## 2) Publicar a Landing Page
A landing está em `landing/`. Ela apresenta o produto e incorpora o formulário por iframe.

Passos:
1. Abra `landing/index.html` e substitua `REPLACE_WITH_GOOGLE_FORM_URL` pela URL pública do seu formulário (Form URL do passo 1).
2. Sirva a pasta `landing/` em qualquer hospedagem estática (GitHub Pages, Netlify, Vercel, Cloudflare Pages, ou abrindo o arquivo localmente para testes).

## 3) Estrutura
- `apps-script/CreateForm.gs`: script Apps Script para criar e configurar o Form.
- `landing/index.html`: página principal com layout moderno.
- `landing/styles.css`: estilos responsivos.
- `landing/script.js`: pequenas interações (scroll suave / CTA).

## 4) Personalização rápida
- Troque o nome do produto em `CreateForm.gs` (const `productName`).
- Ajuste textos do herói, seções e cores em `landing/index.html` e `landing/styles.css`.
- No Google Forms, ajuste o tema (cores e cabeçalho) pela UI nativa do Forms.

## 5) Dúvidas comuns
- “Posso estilizar internamente o Google Forms?”: O Google Forms não suporta CSS customizado interno. A recomendação é estilizar o site de entorno (landing) e embutir o formulário por iframe.
- “Consigo pré-preencher campos?”: Sim, o Forms permite links pré-preenchidos, mas os IDs dos campos (`entry.xxxxx`) são específicos do formulário criado. Gere um link pré-preenchido no Forms e use-o no iframe se desejar.

Bom uso! 🚀
