// Configuración del API
const API_URL = "http://localhost:3000/api";

// Elementos del DOM
const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const loginBtnText = document.getElementById("loginBtnText");
const loginBtnSpinner = document.getElementById("loginBtnSpinner");
const alertMessage = document.getElementById("alertMessage");
const testUserButtons = document.querySelectorAll(".test-user-btn");

// Mostrar mensaje de alerta
function showAlert(message, type = "error") {
  alertMessage.textContent = message;
  alertMessage.className = `alert alert-${type}`;
  alertMessage.style.display = "block";

  // Auto-ocultar después de 5 segundos
  setTimeout(() => {
    alertMessage.style.display = "none";
  }, 5000);
}

// Ocultar mensaje de alerta
function hideAlert() {
  alertMessage.style.display = "none";
}

// Estado de cargando
function setLoading(loading) {
  if (loading) {
    loginBtn.disabled = true;
    loginBtnText.style.display = "none";
    loginBtnSpinner.style.display = "inline-block";
  } else {
    loginBtn.disabled = false;
    loginBtnText.style.display = "inline-block";
    loginBtnSpinner.style.display = "none";
  }
}

// Manejar login
async function handleLogin(email, password) {
  hideAlert();
  setLoading(true);

  try {
    console.log(`Intentando login con: ${email}`);

    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error al iniciar sesión");
    }

    // Login exitoso
    console.log("Login exitoso:", data);

    // Guardar token en localStorage
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token || "");
    localStorage.setItem("user", JSON.stringify(data.user));

    // Mostrar mensaje de éxito
    showAlert(`¡Bienvenido ${data.user.nombre || email}!`, "success");

    // Redirigir al dashboard después de 1 segundo
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1000);
  } catch (error) {
    console.error("Error en login:", error);

    // Verificar si el backend está corriendo
    if (error.message === "Failed to fetch") {
      showAlert(
        "No se puede conectar con el servidor. Asegúrate de que el backend esté corriendo en http://localhost:3000",
        "error",
      );
    } else {
      showAlert(
        error.message ||
          "Credenciales inválidas. Verifica tu email y contraseña.",
        "error",
      );
    }

    setLoading(false);
  }
}

// Event listener para el formulario
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email || !password) {
    showAlert("Por favor completa todos los campos", "warning");
    return;
  }

  await handleLogin(email, password);
});

// Event listeners para botones de usuarios de prueba
testUserButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const email = this.dataset.email;
    const password = this.dataset.password;

    // Rellenar formulario
    emailInput.value = email;
    passwordInput.value = password;

    // Opcional: auto-login
    // handleLogin(email, password);
  });
});

// Verificar si ya hay sesión activa
window.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("access_token");
  const user = localStorage.getItem("user");

  if (token && user) {
    // Ya hay sesión activa, redirigir
    console.log("Sesión activa detectada, redirigiendo...");
    showAlert("Ya tienes una sesión activa, redirigiendo...", "success");
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1000);
  }
});

// Mensaje de ayuda si el backend no está disponible
setTimeout(async () => {
  try {
    const response = await fetch(`${API_URL}/health`);
    if (!response.ok) {
      console.warn("Backend health check failed");
    }
  } catch (error) {
    console.warn("Backend no disponible:", error);
    showAlert(
      "⚠️ Nota: Asegúrate de que el backend esté corriendo con: npm run backend:dev",
      "warning",
    );
  }
}, 500);

console.log("Login script cargado correctamente");
console.log("API URL:", API_URL);
