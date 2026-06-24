# Agenda de Tarefas - Refund 2.0

Esta agenda serve para manter o rastreamento das etapas pendentes e planejamento para as próximas sessões.

---

## 📌 Status Atual
*   **Frontend**: 100% concluído (HTML modularizado em `html/` via `vite-plugin-html-inject`, CSS modular na pasta `css/`, JS para controle de visualizações/mocks, e ativos em minúsculo na pasta `assets`).
*   **Backend**: Em andamento (Configuração do Prisma e SQLite concluídas; rotas de Autenticação prontas com JWT e senhas criptografadas com bcrypt; Middlewares de Autenticação e Autorização baseada em cargos prontos; Rota de criação de reembolsos criada e protegida).

---

## 📅 Próximas Atividades (Próxima Sessão)

### Passo 1: Configuração do Prisma & Banco de Dados (SQLite ou Postgres)
- [x] Inicializar o Prisma no projeto:
  ```bash
  npx prisma init --datasource-provider sqlite
  ```
- [x] Criar o schema do banco contendo as tabelas:
  - `User` (id, name, email, password, role: 'employee' | 'manager')
  - `Refund` (id, name, amount, category, filename, status, userId)
- [x] Rodar a primeira migração:
  ```bash
  npx prisma migrate dev --name init
  ```

### Passo 2: Construção da API com Express (TypeScript)
- [x] Criar as rotas de Autenticação:
  - [x] `POST /users` (Criação de novos usuários)
  - [x] `POST /sessions` (Autenticação com JWT e comparação de hashes)
- [/] Criar rotas para Solicitações de Reembolso:
  - [/] `POST /refunds` (Criação de reembolso, falta incluir upload físico do comprovante via `multer`; estrutura e middlewares de proteção criados)
  - [ ] `GET /refunds` (Listagem das solicitações)
    - Se for Colaborador: lista apenas os dele.
    - Se for Gestor: lista todas as solicitações (com busca por nome e paginação).

### Passo 3: Integração entre Frontend e Backend
- [ ] Substituir a lógica de estados simulados (mock) do `main.js` por requisições assíncronas reais (`fetch()` ou `axios`) apontando para `http://localhost:3333`.
- [ ] Integrar armazenamento de token JWT no `localStorage` do navegador para manter o usuário logado de forma persistente.
