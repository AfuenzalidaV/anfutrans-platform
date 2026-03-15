// Configuración del API
const API_URL = "http://localhost:3000/api";

// Estado global
let currentUser = null;
let accessToken = null;

// Elementos del DOM
const userName = document.getElementById("userName");
const userRole = document.getElementById("userRole");
const userAvatar = document.getElementById("userAvatar");
const welcomeName = document.getElementById("welcomeName");
const logoutBtn = document.getElementById("logoutBtn");

// Stats
const statSolicitudes = document.getElementById("statSolicitudes");
const statAprobadas = document.getElementById("statAprobadas");
const statPendientes = document.getElementById("statPendientes");
const statDocumentos = document.getElementById("statDocumentos");

// API Testing
const testHealthBtn = document.getElementById("testHealthBtn");
const testAuthBtn = document.getElementById("testAuthBtn");
const testDataBtn = document.getElementById("testDataBtn");
const apiResults = document.getElementById("apiResults");

// Verificar autenticación
function checkAuth() {
  accessToken = localStorage.getItem("access_token");
  const userStr = localStorage.getItem("user");

  if (!accessToken || !userStr) {
    console.log("No hay sesión activa, redirigiendo a login...");
    window.location.href = "login.html";
    return false;
  }

  try {
    currentUser = JSON.parse(userStr);
    console.log("Usuario actual:", currentUser);
    return true;
  } catch (error) {
    console.error("Error parsing user data:", error);
    window.location.href = "login.html";
    return false;
  }
}

// Actualizar UI con datos del usuario
function updateUserUI() {
  if (!currentUser) return;

  // Nombre del usuario
  const displayName = currentUser.nombre || currentUser.email.split("@")[0];
  userName.textContent = displayName;
  welcomeName.textContent = displayName;

  // Rol del usuario
  const roleNames = {
    ADMIN: "Administrador",
    DIRECTOR_NACIONAL: "Director Nacional",
    DIRECTOR_REGIONAL: "Director Regional",
    FUNCIONARIO: "Funcionario",
    SOCIO: "Socio",
  };
  const roleName = roleNames[currentUser.rol] || currentUser.rol || "Usuario";
  userRole.textContent = roleName;

  // Avatar con inicial
  const initial = displayName.charAt(0).toUpperCase();
  userAvatar.textContent = initial;
}

// Cerrar sesión
function handleLogout() {
  console.log("Cerrando sesión...");

  // Limpiar localStorage
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");

  // Redirigir a login
  window.location.href = "login.html";
}

// Hacer request autenticado al API
async function authenticatedFetch(endpoint, options = {}) {
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  const response = await fetch(`${API_URL}${endpoint}`, mergedOptions);

  // Si es 401 Unauthorized, cerrar sesión
  if (response.status === 401) {
    console.log("Token inválido o expirado");
    handleLogout();
    throw new Error("Unauthorized");
  }

  return response;
}

// Cargar datos del dashboard
async function loadDashboardData() {
  try {
    console.log("Cargando datos del dashboard...");

    // TODO: Cargar datos reales del backend
    // Por ahora usar datos de ejemplo

    // Solicitudes
    statSolicitudes.textContent = "3";
    statAprobadas.textContent = "12";
    statPendientes.textContent = "1";
    statDocumentos.textContent = "8";

    // Actividad reciente
    const activityContainer = document.getElementById("recentActivity");
    activityContainer.innerHTML = `
            <div style="padding: 1rem 0; border-bottom: 1px solid var(--border-color);">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <strong>Solicitud de Certificado aprobada</strong>
                    <span style="color: var(--text-light); font-size: 0.9rem;">Hace 2 días</span>
                </div>
                <p style="color: var(--text-light); margin: 0;">Tu solicitud de certificado de afiliación ha sido aprobada.</p>
            </div>
            <div style="padding: 1rem 0; border-bottom: 1px solid var(--border-color);">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <strong>Préstamo en revisión</strong>
                    <span style="color: var(--text-light); font-size: 0.9rem;">Hace 5 días</span>
                </div>
                <p style="color: var(--text-light); margin: 0;">Tu solicitud de préstamo está siendo revisada por el director regional.</p>
            </div>
        `;
  } catch (error) {
    console.error("Error cargando datos:", error);
  }
}

// Test Health Endpoint
async function testHealth() {
  try {
    apiResults.textContent = "Consultando /api/health...";

    const response = await fetch(`${API_URL}/health`);
    const data = await response.json();

    apiResults.textContent = `✅ Health Check OK\n\n${JSON.stringify(data, null, 2)}`;
  } catch (error) {
    apiResults.textContent = `❌ Error: ${error.message}`;
  }
}

// Test Auth Status
async function testAuth() {
  try {
    apiResults.textContent = "Consultando usuario actual...";

    const response = await authenticatedFetch("/auth/me");
    const data = await response.json();

    apiResults.textContent = `✅ Auth OK - Usuario autenticado\n\n${JSON.stringify(data, null, 2)}`;
  } catch (error) {
    apiResults.textContent = `❌ Error: ${error.message}`;
  }
}

// Test GET Data
async function testData() {
  try {
    apiResults.textContent = "Consultando datos de prueba...";

    // Intentar varios endpoints
    const endpoints = ["/socios", "/tramites", "/beneficios", "/usuarios"];

    const results = {};

    for (const endpoint of endpoints) {
      try {
        const response = await authenticatedFetch(endpoint);

        if (response.ok) {
          const data = await response.json();
          results[endpoint] = {
            status: response.status,
            count: Array.isArray(data) ? data.length : "N/A",
            sample: Array.isArray(data) ? data.slice(0, 2) : data,
          };
        } else {
          results[endpoint] = {
            status: response.status,
            error: await response.text(),
          };
        }
      } catch (error) {
        results[endpoint] = {
          error: error.message,
        };
      }
    }

    apiResults.textContent = `Resultados de consultas a endpoints:\n\n${JSON.stringify(results, null, 2)}`;
  } catch (error) {
    apiResults.textContent = `❌ Error: ${error.message}`;
  }
}

// Event Listeners
logoutBtn.addEventListener("click", handleLogout);

if (testHealthBtn) {
  testHealthBtn.addEventListener("click", testHealth);
}

if (testAuthBtn) {
  testAuthBtn.addEventListener("click", testAuth);
}

if (testDataBtn) {
  testDataBtn.addEventListener("click", testData);
}

// Navegación del sidebar
document.querySelectorAll(".nav-item").forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();

    // Remover active de todos
    document
      .querySelectorAll(".nav-item")
      .forEach((i) => i.classList.remove("active"));

    // Agregar active al clickeado
    this.classList.add("active");

    const section = this.dataset.section;
    console.log("Navegando a sección:", section);

    // TODO: Cargar contenido de la sección
  });
});

// Inicialización
window.addEventListener("DOMContentLoaded", () => {
  console.log("Dashboard cargando...");

  // Verificar autenticación
  if (!checkAuth()) {
    return;
  }

  // Actualizar UI
  updateUserUI();

  // Cargar datos
  loadDashboardData();

  console.log("Dashboard cargado correctamente");
});

console.log("Dashboard script cargado");
console.log("API URL:", API_URL);
