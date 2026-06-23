# Memória do Processo de Desenvolvimento

Este documento serve como histórico de decisões de arquitetura, configurações do ambiente e do fluxo de trabalho adotado no projeto **Refund 2.0** para referências em sessões futuras.

---

## 🔑 Configuração do Figma MCP (Model Context Protocol)

Para permitir que o agente AI leia as especificações de design do Figma diretamente em tempo real, configuramos o servidor MCP baseado em Token de Desenvolvedor.

1.  **Geração do Token no Figma**: Configurações de Perfil > Account > Personal access tokens > Generate new token.
2.  **Configuração do IDE Antigravity**: O arquivo central do IDE em `c:\Users\clara\.gemini\config\mcp_config.json` foi configurado para instanciar o servidor de API do Figma localmente via `npx`:

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

O layout possui as seguintes especificidades coletadas pelo MCP:
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

## ⚙️ Decisões de Arquitetura do Frontend

1.  **Vanilla Stack (HTML/CSS/JS)**:
    Como o desenvolvedor ainda não havia aprendido frameworks complexos (React, Tailwind), optou-se por construir o frontend de forma clássica usando HTML, CSS e JavaScript puros.
2.  **Vite como Dev Server**:
    O Vite foi adicionado como dependência de desenvolvimento no `package.json` para rodar o projeto localmente com recarregamento rápido em tempo real, sem poluir a estrutura pura de arquivos.
3.  **Single Page App (SPA) Virtual**:
    Para evitar a criação de múltiplos arquivos HTML e manter dados persistentes na memória durante testes locais, todas as seções (Login, Cadastro, Colaborador, Confirmação, Gestor) foram criadas em um único `index.html`. O controle de exibição é feito alternando a classe CSS `.hidden` no `main.js`.
4.  **Refatoração do CSS (Modular)**:
    Inicialmente, todo o CSS foi escrito no `style.css` da raiz. Posteriormente, os estilos foram divididos em arquivos menores na pasta `css/` organizados por escopo (global, botões, inputs, modal, etc.) e importados no `style.css` raiz com `@import`. Isso facilita a manutenção e leitura.
