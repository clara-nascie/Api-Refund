# 🔑 Autenticação & Perfis de Usuário

Este documento descreve como a lógica de autenticação está estruturada no frontend e como alternar entre as visões do sistema.

---

## 🔒 Lógica de Autenticação (Simulador)

Como o frontend está desconectado temporariamente do banco de dados real, a lógica de login no `main.js` avalia o e-mail digitado no formulário para redirecionar o usuário para a tela correspondente à sua permissão (role).

### 👥 Credenciais de Teste

| E-mail | Senha | Perfil | Destino |
| :--- | :--- | :--- | :--- |
| `colaborador@email.com` | `123` | Colaborador (Employee) | Formulário de Reembolso |
| `gestor@email.com` | `123` | Gestor (Manager) | Dashboard de Análise |

*(Qualquer outro e-mail digitado será considerado por padrão um perfil de Colaborador).*

---

## 💻 Fluxos de Uso

### 1. Colaborador (Employee Flow)
Após fazer login, o colaborador acessa um formulário simplificado onde pode:
*   Registrar o **nome da despesa** (título).
*   Selecionar uma **categoria** (Alimentação, Transporte, Hospedagem, Serviços, Outros).
*   Digitar o **valor** monetário.
*   Fazer o **upload** (simulado) do comprovante em PDF ou Imagem via clique ou arrastando o arquivo (Drag & Drop).
*   Ao enviar, os dados são injetados na lista em memória e o usuário é redirecionado para a tela de **Confirmação de Sucesso**.

### 2. Gestor (Manager Flow)
Ao entrar como gestor, o usuário visualiza o painel corporativo que exibe:
*   A listagem geral das solicitações enviadas em tempo real (com paginação configurada para exibir 5 itens por página).
*   Um campo de busca que filtra as solicitações dinamicamente por nome ou título.
*   Ao clicar em qualquer linha da tabela, abre-se um **Modal de Detalhes** contendo as informações da despesa e um botão para abrir o documento comprovante anexado.
