# ⚙️ Stack & Design System

![Node](https://img.shields.io/badge/node-%3E%3D20.x-007acc?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-007acc?style=flat-square&logo=typescript)
![Express](https://img.shields.io/badge/Express-4.19-7d7d7d?style=flat-square&logo=express)
![Prisma](https://img.shields.io/badge/Prisma-5.19-5a29a6?style=flat-square&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-0064a5?style=flat-square&logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-Enabled-00bfff?style=flat-square&logo=docker)
![Coverage](https://img.shields.io/badge/Coverage-63%25-cbb000?style=flat-square)

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
