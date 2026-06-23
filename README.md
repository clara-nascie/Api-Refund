# Refund - Sistema de Reembolso 2.0

O **Refund** é uma aplicação web para solicitação e gerenciamento de reembolsos de despesas corporativas. Este projeto foi desenvolvido com base no layout do Figma fornecido pela comunidade da Rocketseat.

---

## 🎨 Layout do Figma
O design da aplicação pode ser acessado através do link abaixo:
*   [Figma Project Link](https://www.figma.com/design/ZpJQ9dbEMPJvmJp3t17pv3/Sistema-de-reembolso-2.0--Community-?node-id=0-1&p=f&t=XXpSj3a2SZhA1dyv-0)

---

## 🛠️ Tecnologias Utilizadas

### Frontend (Atual)
*   **HTML5** (Estrutura semântica das views)
*   **CSS3 Vanilla** (Restruturado modularmente)
*   **JavaScript Vanilla** (Interações, controle de estado local e roteamento)
*   **Vite** (Servidor de desenvolvimento rápido e empacotamento)
*   **Phosphor Icons** (Ícones visuais consumidos via CDN)

### Backend (Futuro)
*   **Node.js** com **Express**
*   **TypeScript**
*   **Prisma ORM** (Banco de dados)

---

## 📂 Estrutura de Pastas do Frontend

```text
Api Refund/
├── css/
│   ├── auth.css        # Estilos das telas de login/cadastro
│   ├── buttons.css     # Estilos de botões e links clicáveis
│   ├── dashboard.css   # Layout base das áreas de painéis
│   ├── employee.css    # Formulário e fluxos de colaborador
│   ├── global.css      # Variáveis, resets e animações globais
│   ├── inputs.css      # Inputs, selects e área de upload
│   ├── manager.css     # Tabelas, paginação e visualizações de gestor
│   └── modal.css       # Estilo do modal de detalhes (overlay/blur)
├── src/
│   └── server.ts       # Ponto de entrada do futuro backend em Express
├── index.html          # HTML principal que agrupa as views (Single Page App)
├── main.js             # Lógica das telas, mocks e roteamento
├── style.css           # Agregador central do CSS que importa a pasta css/
├── package.json        # Dependências e scripts do projeto
└── tsconfig.json       # Configuração do TypeScript
```

---

## 🚀 Como Executar o Projeto

1. Certifique-se de ter o **Node.js** instalado em sua máquina.
2. Na raiz do projeto, instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento do frontend:
   ```bash
   npm run dev
   ```
4. Abra o endereço gerado no terminal (geralmente `http://localhost:5173`).

---

## 🔑 Contas de Teste (Simulador)

Como o frontend utiliza um simulador de dados locais (in-memory mock), você pode testar os diferentes fluxos com os seguintes logins:

*   **Perfil do Colaborador (Solicita Reembolso)**:
    *   **E-mail**: `colaborador@email.com`
    *   **Senha**: `123`
*   **Perfil do Gestor (Gerencia Reembolsos)**:
    *   **E-mail**: `gestor@email.com`
    *   **Senha**: `123`
