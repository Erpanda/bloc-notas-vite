import { redirigirSiAutenticado, mostrarError, mostrarExito } from '../utils/helpers.js';
import { registrarUsuario } from '../services/authService.js';
import { validarFormularioRegistro } from '../utils/validators.js';
import { cargarFooter } from '../modules/footer.js';

redirigirSiAutenticado();
cargarFooter();

// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    
    if (registerForm) {
        registerForm.addEventListener('submit', manejarRegistro);
    }
});

// Manejar envío del formulario de login
async function manejarRegistro(e) {
    e.preventDefault();
    
    // Obtener valores del formulario (registro)
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validar formulario
    const validacion = validarFormularioRegistro(nombre, apellido, password, confirmPassword);
    
    if (!validacion.valido) {
        mostrarError(validacion.errores.join(', '));
        return;
    }

    // Deshabilitar botón mientras procesa
    const btnSubmit = e.target.querySelector('button[type="submit"]');
    btnSubmit.disabled = true;
    btnSubmit.textContent = 'Registrando...';
    
    // Intentar registrar usuario
    const resultado = await registrarUsuario(nombre, apellido, email, password);
    
    if (resultado.success) {
        // Mostrar mensaje de éxito
        mostrarExito('¡Registro exitoso! Revisa tu email para confirmar tu cuenta.');
        
        // Limpiar formulario
        e.target.reset();
        
        // Redirigir al login después de 3 segundos
        setTimeout(() => {
            window.location.href = 'login';
        }, 3000);
        
    } else {
        // Mostrar error
        mostrarError(resultado.error || 'Error al registrar usuario. Intenta de nuevo.');
        
        // Re-habilitar botón
        btnSubmit.disabled = false;
        btnSubmit.textContent = 'Registrarse';
    }
}