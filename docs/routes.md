# 🗺️ Rotas & Fluxo de Telas

Este documento mapeia o sistema de roteamento virtual do Frontend (SPA) e detalha o planejamento das rotas HTTP para o futuro Backend.

---

## 💻 Roteamento Virtual (Frontend SPA)

O frontend foi estruturado como uma **Single Page Application (SPA)** virtual. Todas as telas estão no arquivo `index.html` e são controladas pelo JavaScript (`main.js`), que adiciona ou remove a classe `.hidden` das seções do DOM.

### Mapeamento das Views HTML

| ID da Seção | Finalidade da View | Gatilho de Exibição |
| :--- | :--- | :--- |
| `view-signin` | Tela de Login (SignIn) | Exibida por padrão ao carregar a página ou no Logout. |
| `view-signup` | Tela de Cadastro (SignUp) | Ao clicar em "Criar conta" na tela de login. |
| `view-employee` | Formulário de Reembolso | Login bem-sucedido de Colaborador. |
| `view-confirmation` | Sucesso no Envio | Ao submeter o formulário de reembolso. |
| `view-manager` | Painel Geral do Gestor | Login bem-sucedido do Gestor. |

---

## 📡 Planejamento de Rotas (Backend API)

Quando integrarmos a API desenvolvida em **Express & TypeScript**, o JavaScript do frontend substituirá a manipulação de memória local por chamadas HTTP reais (`fetch` ou `axios`).

Abaixo estão listadas as rotas do backend mapeadas:

### 1. Autenticação (Auth)
*   `POST /users`
    *   **Descrição**: Cadastra um novo colaborador no banco de dados.
    *   **Corpo da Requisição**: `{ name, email, password }`
*   `POST /sessions`
    *   **Descrição**: Autentica o usuário e gera um token JWT.
    *   **Corpo da Requisição**: `{ email, password }`
    *   **Resposta**: `{ token, user: { name, email, role } }`

### 2. Solicitações de Reembolso (Refunds)
*   `POST /refunds`
    *   **Descrição**: Cria uma nova solicitação de reembolso. Deve exigir autenticação (Token JWT no Header) e receber o arquivo físico via `multipart/form-data` (usando `multer`).
    *   **Corpo da Requisição**: `{ title, category, value, file }`
*   `GET /refunds`
    *   **Descrição**: Lista as solicitações cadastradas.
    *   **Parâmetros de Busca**: `?search=nome&page=1`
    *   **Regra de Acesso**:
        *   Se for *Colaborador*: Retorna apenas os reembolsos criados pelo próprio usuário autenticado.
        *   Se for *Gestor*: Retorna todos os reembolsos registrados no sistema.
