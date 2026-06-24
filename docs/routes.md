# 🗺️ Rotas & Fluxo de Telas

Este documento mapeia o sistema de roteamento virtual do Frontend (SPA) e detalha o planejamento das rotas HTTP para o futuro Backend.

---

## 💻 Roteamento Virtual (Frontend SPA)

O frontend foi estruturado como uma **Single Page Application (SPA)** virtual. As telas individuais estão modularizadas sob a pasta `html/` e são injetadas em tempo de compilação pelo Vite. No navegador, o controle de exibição é feito puramente em JavaScript (`main.js`), adicionando ou removendo a classe `.hidden` das seções carregadas no DOM da div `#app`.

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
*   `POST /users` [Implementado]
    *   **Descrição**: Cadastra um novo colaborador ou gestor no banco de dados.
    *   **Corpo da Requisição**: `{ name, email, password, role }`
*   `POST /sessions` [Implementado]
    *   **Descrição**: Autentica o usuário e gera um token JWT.
    *   **Corpo da Requisição**: `{ email, password }`
    *   **Resposta**: `{ token, user: { id, name, email, role } }`

### 2. Solicitações de Reembolso (Refunds)
Todas as rotas sob `/refunds` são protegidas pelo middleware `ensureAuthentication`.
*   `POST /refunds` [Estruturado & Protegido]
    *   **Descrição**: Cria uma nova solicitação de reembolso.
    *   **Regra de Autorização**: Permitido apenas para usuários do tipo `employee` via middleware `verifyUserAuthorization(["employee"])`.
    *   **Planejamento pendente**: Integração com `multer` para upload físico de comprovantes.
*   `GET /refunds` [Planejado]
    *   **Descrição**: Lista as solicitações cadastradas.
    *   **Parâmetros de Busca**: `?search=nome&page=1`
    *   **Regras de Acesso**:
        *   Se for *Colaborador*: Retorna apenas os reembolsos criados pelo próprio usuário autenticado.
        *   Se for *Gestor*: Retorna todos os reembolsos registrados no sistema.
