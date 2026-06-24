# ⚙️ Stack & Design System

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

Este documento detalha os benchmarks de tecnologia, o ambiente técnico do projeto, as configurações de design extraídas do Figma e as decisões de infraestrutura de código. Este documento deve ser mantido atualizado à medida que novas tecnologias ou linguagens forem incorporadas ao ecossistema da aplicação.

---


## 🔑 Configuração do Figma MCP

Para permitir que o agente AI leia as especificações de design do Figma diretamente em tempo real, configuramos o servidor MCP baseado em Token de Desenvolvedor no arquivo central do IDE em `c:\Users\clara\.gemini\config\mcp_config.json`:

```json
{
  "mcpServers": {
    "figma-developer": {
      "command": "npx",
      "args": [
        "-y",
        "figma-developer-mcp",
        "--stdio"
      ],
      "env": {
        "FIGMA_API_KEY": "SEU_TOKEN_DO_FIGMA_AQUI"
      }
    }
  }
}
```

---

## 🎨 Especificações de Design (Extraídas do Figma)

*   **Tipografia**: Fonte principal **Open Sans** (corpo de texto, inputs, tabelas) e **Plus Jakarta Sans** (títulos, botões).
*   **Paleta de Cores**:
    *   `gray-100` (`#1F2523`): Textos principais.
    *   `gray-200` (`#4D5C57`): Subtítulos, labels e placeholders.
    *   `gray-300` (`#CDD5D2`): Bordas e divisórias discretas.
    *   `gray-400` (`#E4ECE9`): Fundo principal (Light Theme).
    *   `gray-500` (`#F9FBFA`): Fundo dos cards brancos.
    *   `green-100` (`#1F8459`): Cor primária da marca (botões ativos, badges de sucesso).
    *   `green-200` (`#2CB178`): Hover de botões.

---

## 🚀 Decisões de Arquitetura do Frontend

1.  **Vanilla Stack (HTML/CSS/JS)**:
    Como o desenvolvedor ainda não havia aprendido frameworks complexos (React, Tailwind), optou-se por construir o frontend de forma clássica usando HTML, CSS e JavaScript puros.
2.  **Vite como Dev Server**:
    O Vite foi adicionado como dependência de desenvolvimento no `package.json` para rodar o projeto localmente com recarregamento rápido em tempo real, sem poluir a estrutura pura de arquivos.
3.  **Organização Modular de Estilos**:
    Os estilos foram divididos em arquivos menores na pasta `css/` organizados por escopo (global, botões, inputs, modal, etc.) e importados no `style.css` raiz com `@import`. Isso facilita a manutenção e leitura.
4.  **Organização Modular do HTML**:
    Com a ajuda do plugin `vite-plugin-html-inject` configurado no Vite, o arquivo monolítico `index.html` foi dividido em componentes modulares na pasta `html/` (ex: `signin.html`, `signup.html`, `employee.html`, etc.) e são injetados em tempo de compilação usando a tag `<load src="..." />`. Isso simplificou o esqueleto principal e facilitou a manutenção de cada tela de forma isolada.

---

## 📡 Decisões de Arquitetura do Backend

1.  **TypeScript & Express**:
    Para construir uma API robusta, tipada e de fácil manutenção, optou-se por utilizar o Express integrado com TypeScript (compilado e executado via `tsx watch` em desenvolvimento).
2.  **Prisma ORM com SQLite**:
    Utilizado para modelagem rápida de dados e migrações estruturadas. O SQLite foi adotado pela facilidade de configuração local e por não necessitar de servidor de banco de dados separado nesta fase.
3.  **Autenticação Stateless (JWT)**:
    Implementação de login utilizando tokens JWT e senhas criptografadas com `bcrypt`. Os dados do usuário autenticado são propagados de forma segura pelas rotas autenticadas por meio de middlewares dedicados (`ensureAuthentication`).
4.  **Validação com Zod**:
    Garantia de que os dados enviados no corpo das requisições (como cadastro de usuários e criação de sessões) correspondam exatamente aos tipos e validações esperadas, lançando erros estruturados caso contrário.

