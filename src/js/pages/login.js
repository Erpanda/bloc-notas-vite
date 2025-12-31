import { redirigirSiAutenticado, mostrarError } from '../utils/helpers.js';
import { iniciarSesion } from '../services/authService.js';
import { cargarFooter } from '../modules/footer.js';

redirigirSiAutenticado();
cargarFooter();

// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', manejarLogin);
    }
});

// Manejar envío del formulario de login
async function manejarLogin(e) {
    e.preventDefault();
    
    // Obtener valores del formulario
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    
    // Deshabilitar botón mientras procesa
    const btnSubmit = e.target.querySelector('button[type="submit"]');
    btnSubmit.disabled = true;
    btnSubmit.textContent = 'Iniciando sesión...';
    
    // Intentar iniciar sesión
    const resultado = await iniciarSesion(email, password);
    
    if (resultado.success) {
        window.location.href = 'dashboard';
    } else {
        mostrarError(resultado.error || 'Error al iniciar sesión. Verifica tus credenciales.');
        
        // Re-habilitar botón
        btnSubmit.disabled = false;
        btnSubmit.textContent = 'Iniciar Sesión';
    }
}