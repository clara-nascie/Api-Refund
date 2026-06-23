// ==========================================
// DADOS SIMULADOS (MOCK DATA) E ESTADOS
// ==========================================

// Dados iniciais das solicitações de reembolso (conforme Figma)
let refundRequests = [
  {
    id: "req-1",
    employeeName: "Rodrigo Gonçalves",
    title: "Almoço de negócios",
    category: "Alimentação",
    value: 34.78,
    fileName: "nota_fiscal_almoco_12.pdf",
    createdAt: "23/06/2026"
  },
  {
    id: "req-2",
    employeeName: "Tamires Santos",
    title: "Diárias de hotel em SP",
    category: "Hospedagem",
    value: 1200.00,
    fileName: "reserva_hotel_sao_paulo.pdf",
    createdAt: "22/06/2026"
  },
  {
    id: "req-3",
    employeeName: "Lara Silva",
    title: "Lanche da tarde equipe",
    category: "Alimentação",
    value: 12.35,
    fileName: "cupom_fiscal_padaria.pdf",
    createdAt: "22/06/2026"
  },
  {
    id: "req-4",
    employeeName: "Elias Souza",
    title: "Combustível visita técnica",
    category: "Transporte",
    value: 47.65,
    fileName: "recibo_posto_gasolina.pdf",
    createdAt: "21/06/2026"
  },
  {
    id: "req-5",
    employeeName: "Thiago Rocha",
    title: "Manutenção de laptop",
    category: "Serviços",
    value: 99.90,
    fileName: "nota_assistencia_notebook.pdf",
    createdAt: "20/06/2026"
  },
  {
    id: "req-6",
    employeeName: "Vinicius Oliveira",
    title: "Correio sedex documentos",
    category: "Outros",
    value: 25.89,
    fileName: "comprovante_sedex.pdf",
    createdAt: "19/06/2026"
  }
];

// Estado da Aplicação
let currentUser = null;
let currentRole = "employee"; // "employee" ou "manager"
let selectedFile = null;
let currentPage = 1;
const itemsPerPage = 5;
let filteredRequests = [...refundRequests];

// Mapeamento de Ícones por Categoria
const categoryIcons = {
  "Alimentação": "ph-fork-knife",
  "Transporte": "ph-police-car",
  "Hospedagem": "ph-bed",
  "Serviços": "ph-wrench",
  "Outros": "ph-receipt"
};

// Mapeamento de Classes CSS de Categoria
const categoryClasses = {
  "Alimentação": "cat-alimentacao",
  "Transporte": "cat-transporte",
  "Hospedagem": "cat-hospedagem",
  "Serviços": "cat-servicos",
  "Outros": "cat-outros"
};

// ==========================================
// SELETORES DO DOM
// ==========================================
const views = {
  signin: document.getElementById("view-signin"),
  signup: document.getElementById("view-signup"),
  employee: document.getElementById("view-employee"),
  confirmation: document.getElementById("view-confirmation"),
  manager: document.getElementById("view-manager")
};

// Formulários
const signinForm = document.getElementById("signin-form");
const signupForm = document.getElementById("signup-form");
const refundForm = document.getElementById("refund-form");

// Navegação de Telas
const linkGotoSignup = document.getElementById("link-goto-signup");
const linkGotoSignin = document.getElementById("link-goto-signin");
const btnNewRequest = document.getElementById("btn-new-request");

// Elementos de Upload
const fileInput = document.getElementById("refund-file");
const fileDropArea = document.getElementById("file-drop-area");
const fileSelectedName = document.getElementById("file-selected-name");
const fileNameText = document.getElementById("file-name-text");
const btnRemoveFile = document.getElementById("btn-remove-file");

// Elementos de Usuário
const employeeUserName = document.getElementById("employee-user-name");
const confirmationUserName = document.getElementById("confirmation-user-name");

// Botões de Logout
const btnEmployeeLogout = document.getElementById("btn-employee-logout");
const btnConfirmationLogout = document.getElementById("btn-confirmation-logout");
const btnManagerLogout = document.getElementById("btn-manager-logout");

// Painel do Gestor (Tabela, Busca, Paginação)
const refundListTbody = document.getElementById("refund-list-tbody");
const searchInput = document.getElementById("search-input");
const btnPrevPage = document.getElementById("btn-prev-page");
const btnNextPage = document.getElementById("btn-next-page");
const paginationInfo = document.getElementById("pagination-info");

// Modal de Detalhes
const detailsModal = document.getElementById("details-modal");
const btnCloseModal = document.getElementById("btn-close-modal");
const btnModalBack = document.getElementById("btn-modal-back");
const detailEmployee = document.getElementById("detail-employee");
const detailCategory = document.getElementById("detail-category");
const detailCategoryIcon = document.getElementById("detail-category-icon");
const detailValue = document.getElementById("detail-value");
const detailFilename = document.getElementById("detail-filename");
const btnOpenDoc = document.getElementById("btn-open-doc");

// ==========================================
// FUNÇÕES DE NAVEGAÇÃO DE TELAS
// ==========================================
function showView(viewName) {
  // Oculta todas as views
  Object.values(views).forEach(view => {
    view.classList.add("hidden");
  });
  
  // Exibe a view selecionada
  if (views[viewName]) {
    views[viewName].classList.remove("hidden");
  }
  
  // Reseta estados específicos de tela
  if (viewName === "employee") {
    resetRefundForm();
  }
}

// ==========================================
// LOGICA DE SESSÃO (AUTH)
// ==========================================

// Login
signinForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const email = document.getElementById("signin-email").value.trim().toLowerCase();
  const password = document.getElementById("signin-password").value;
  
  if (!email || !password) return;
  
  if (email === "gestor@email.com") {
    currentUser = { name: "Administrador", email: email };
    currentRole = "manager";
    initManagerDashboard();
    showView("manager");
  } else {
    // Para qualquer outra conta (inclui a padrão colaborador@email.com)
    let userName = "Rodrigo Gonçalves";
    if (email === "colaborador@email.com") {
      userName = "Rodrigo Gonçalves";
    } else {
      // Extrai um nome amigável a partir do e-mail
      const prefix = email.split('@')[0];
      userName = prefix.charAt(0).toUpperCase() + prefix.slice(1);
    }
    
    currentUser = { name: userName, email: email };
    currentRole = "employee";
    employeeUserName.textContent = userName;
    confirmationUserName.textContent = userName;
    showView("employee");
  }
});

// Cadastro (Cadastro Simulado)
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const name = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const confirmPassword = document.getElementById("signup-confirm-password").value;
  
  if (password !== confirmPassword) {
    alert("As senhas não coincidem!");
    return;
  }
  
  alert("Conta criada com sucesso! Faça login para continuar.");
  showView("signin");
  signinForm.reset();
});

// Ir para Cadastro
linkGotoSignup.addEventListener("click", (e) => {
  e.preventDefault();
  showView("signup");
});

// Ir para Login
linkGotoSignin.addEventListener("click", (e) => {
  e.preventDefault();
  showView("signin");
});

// Logout
const handleLogout = () => {
  currentUser = null;
  selectedFile = null;
  signinForm.reset();
  signupForm.reset();
  showView("signin");
};

btnEmployeeLogout.addEventListener("click", handleLogout);
btnConfirmationLogout.addEventListener("click", handleLogout);
btnManagerLogout.addEventListener("click", handleLogout);

// ==========================================
// UPLOAD DE COMPROVANTE (COLABORADOR)
// ==========================================

// Atualizar interface com arquivo selecionado
function setFile(file) {
  if (file) {
    selectedFile = file;
    fileNameText.textContent = file.name;
    fileDropArea.classList.add("hidden");
    fileSelectedName.classList.remove("hidden");
    fileInput.required = false; // Como o arquivo já está guardado no JS
  }
}

// Remover arquivo
function removeFile() {
  selectedFile = null;
  fileInput.value = "";
  fileDropArea.classList.remove("hidden");
  fileSelectedName.classList.add("hidden");
  fileInput.required = true;
}

// Evento ao mudar arquivo via Input
fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) setFile(file);
});

// Eventos de Drag & Drop
fileDropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  fileDropArea.style.borderColor = "var(--green-200)";
  fileDropArea.style.backgroundColor = "var(--green-light)";
});

fileDropArea.addEventListener("dragleave", () => {
  fileDropArea.style.borderColor = "";
  fileDropArea.style.backgroundColor = "";
});

fileDropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  fileDropArea.style.borderColor = "";
  fileDropArea.style.backgroundColor = "";
  
  const file = e.dataTransfer.files[0];
  if (file) setFile(file);
});

btnRemoveFile.addEventListener("click", removeFile);

// Envio do formulário de Reembolso
refundForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const title = document.getElementById("refund-title").value;
  const category = document.getElementById("refund-category").value;
  const value = parseFloat(document.getElementById("refund-value").value);
  
  if (!title || !category || isNaN(value) || !selectedFile) {
    alert("Por favor, preencha todos os campos e envie um comprovante.");
    return;
  }
  
  // Criar nova solicitação e adicionar ao início do array (para ver no Gestor)
  const newRequest = {
    id: `req-${Date.now()}`,
    employeeName: currentUser ? currentUser.name : "Colaborador Anônimo",
    title: title,
    category: category,
    value: value,
    fileName: selectedFile.name,
    createdAt: new Date().toLocaleDateString("pt-BR")
  };
  
  refundRequests.unshift(newRequest);
  
  // Mostrar tela de confirmação
  showView("confirmation");
});

// Botão para criar Nova Solicitação na tela de confirmação
btnNewRequest.addEventListener("click", () => {
  showView("employee");
});

function resetRefundForm() {
  refundForm.reset();
  removeFile();
}

// ==========================================
// PAINEL DO GESTOR (MANAGER)
// ==========================================

function initManagerDashboard() {
  currentPage = 1;
  searchInput.value = "";
  applyFiltersAndRender();
}

// Filtrar e Renderizar tabela do Gestor
function applyFiltersAndRender() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  
  filteredRequests = refundRequests.filter(req => {
    return req.employeeName.toLowerCase().includes(searchTerm) || 
           req.title.toLowerCase().includes(searchTerm);
  });
  
  // Ajusta página atual se ultrapassar o limite após o filtro
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage) || 1;
  if (currentPage > totalPages) {
    currentPage = totalPages;
  }
  
  renderTable();
  renderPagination(totalPages);
}

// Formatar valor para R$
function formatCurrency(val) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(val);
}

// Renderizar linhas da tabela
function renderTable() {
  refundListTbody.innerHTML = "";
  
  if (filteredRequests.length === 0) {
    refundListTbody.innerHTML = `
      <tr>
        <td colspan="3" style="text-align: center; color: var(--gray-200); padding: 32px;">
          Nenhuma solicitação encontrada.
        </td>
      </tr>
    `;
    return;
  }
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageItems = filteredRequests.slice(startIndex, endIndex);
  
  pageItems.forEach(req => {
    const iconClass = categoryIcons[req.category] || "ph-receipt";
    const bgClass = categoryClasses[req.category] || "cat-outros";
    
    const tr = document.createElement("tr");
    tr.dataset.id = req.id;
    
    tr.innerHTML = `
      <td>
        <div class="colab-cell">
          <div class="category-icon-box ${bgClass}">
            <i class="ph ${iconClass}"></i>
          </div>
          <div class="colab-info">
            <div class="colab-name">${req.employeeName}</div>
            <div class="colab-category">${req.title}</div>
          </div>
        </div>
      </td>
      <td>
        <span class="category-tag">${req.category}</span>
      </td>
      <td class="text-right value-cell">
        ${formatCurrency(req.value)}
      </td>
    `;
    
    // Abre modal de detalhes ao clicar na linha
    tr.addEventListener("click", () => {
      openDetailsModal(req);
    });
    
    refundListTbody.appendChild(tr);
  });
}

// Renderizar paginação
function renderPagination(totalPages) {
  paginationInfo.textContent = `${currentPage}/${totalPages}`;
  
  btnPrevPage.disabled = currentPage === 1;
  btnNextPage.disabled = currentPage === totalPages;
}

// Eventos de Busca e Paginação
searchInput.addEventListener("input", () => {
  currentPage = 1;
  applyFiltersAndRender();
});

btnPrevPage.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    applyFiltersAndRender();
  }
});

btnNextPage.addEventListener("click", () => {
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    applyFiltersAndRender();
  }
});

// ==========================================
// MODAL DE DETALHES
// ==========================================
function openDetailsModal(req) {
  detailEmployee.textContent = req.employeeName;
  detailCategory.textContent = req.category;
  detailValue.textContent = formatCurrency(req.value);
  detailFilename.textContent = req.fileName;
  
  // Configura ícone da categoria no modal
  const iconClass = categoryIcons[req.category] || "ph-receipt";
  detailCategoryIcon.className = `ph ${iconClass}`;
  
  // Limpa classes anteriores de tag no modal e adiciona a nova
  const tagBox = detailCategoryIcon.parentElement;
  tagBox.className = "detail-category-tag"; // reseta
  tagBox.classList.add(req.category);
  
  // Simulador de link de abertura
  btnOpenDoc.href = "#";
  btnOpenDoc.onclick = (e) => {
    e.preventDefault();
    alert(`Visualização simulada do comprovante: ${req.fileName}`);
  };
  
  detailsModal.classList.remove("hidden");
}

function closeDetailsModal() {
  detailsModal.classList.add("hidden");
}

btnCloseModal.addEventListener("click", closeDetailsModal);
btnModalBack.addEventListener("click", closeDetailsModal);

// Fecha modal clicando fora da caixa
detailsModal.addEventListener("click", (e) => {
  if (e.target === detailsModal) {
    closeDetailsModal();
  }
});

// ==========================================
// INICIALIZAÇÃO DA APLICAÇÃO
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  showView("signin");
});
