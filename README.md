# Refund - Sistema de Reembolso 2.0

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=flat-square&logo=sqlite&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=flat-square&logo=json-web-tokens)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)


O **Refund** é uma aplicação web para solicitação e gerenciamento de reembolsos de despesas corporativas. Este projeto foi desenvolvido com base no layout do Figma fornecido pela comunidade da Rocketseat.

---

## 🎨 Layout do Figma
O design da aplicação pode ser acessado através do link abaixo:
*   [Figma Project Link](https://www.figma.com/design/ZpJQ9dbEMPJvmJp3t17pv3/Sistema-de-reembolso-2.0--Community-?node-id=0-1&p=f&t=XXpSj3a2SZhA1dyv-0)

---

## 🛠️ Tecnologias Utilizadas

### Frontend
*   **HTML5** (Estrutura semântica das views)
*   **CSS3 Vanilla** (Estilos organizados de forma modular)
*   **JavaScript Vanilla** (Interações, controle de estado local e roteamento virtual)
*   **Vite** (Servidor de desenvolvimento local rápido)
*   **Phosphor Icons** (Ícones visuais consumidos via CDN)

### Backend
*   **TypeScript** (Linguagem com tipagem estática e superset JavaScript)
*   **Express** (Framework de rotas e controladores HTTP)
*   **Prisma ORM** (Modelagem de dados e integração com o banco)
*   **SQLite** (Banco de dados relacional local)
*   **JSON Web Tokens (JWT)** (Autenticação de usuários baseada em tokens)
*   **Bcrypt** (Criptografia e comparação segura de senhas)
*   **Zod** (Validação e parsing do corpo de requisições)

---

## 📂 Estrutura de Pastas

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
├── docs/               # Documentação modular das sessões
├── index.html          # HTML principal que agrupa as views (Single Page App)
├── main.js             # Lógica das telas, mocks e roteamento
├── style.css           # Agregador central do CSS que importa a pasta css/
├── package.json        # Configuração do Vite e scripts do projeto
└── .gitignore          # Arquivos e pastas ignorados pelo Git
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
