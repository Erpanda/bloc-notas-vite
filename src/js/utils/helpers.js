// Guardar sesión del usuario
function guardarSesion(user, profile) {
    localStorage.setItem('user', JSON.stringify({
        id: user.id,
        email: user.email
    }));
    
    if (profile) {
        localStorage.setItem('profile', JSON.stringify(profile));
    }
}

// Obtener datos de sesión
function obtenerSesion() {
    const user = localStorage.getItem('user');
    const profile = localStorage.getItem('profile');
    
    return {
        user: user ? JSON.parse(user) : null,
        profile: profile ? JSON.parse(profile) : null
    };
}

// Limpiar sesión (logout)
function limpiarSesion() {
    localStorage.removeItem('user');
    localStorage.removeItem('profile');
}

// Verificar si hay sesión activa
function verificarAutenticacion() {
    const { user } = obtenerSesion();
    return user !== null;
}

// Redirigir si no está autenticado
function protegerRuta() {
    if (!verificarAutenticacion()) {
        window.location.href = '/';
    }
}

// Redirigir si YA está autenticado (para login/register)
function redirigirSiAutenticado() {
    if (verificarAutenticacion()) {
        window.location.href = 'dashboard';
    }
}

// ============================================

// Mostrar mensajes de error
function mostrarError(mensaje) {
    const elemento = document.getElementById("errorMessage");
    if (!elemento) return;

    elemento.textContent = mensaje;
    elemento.classList.remove('d-none');

    setTimeout(() => {
        elemento.classList.add('d-none');
        elemento.textContent = '';
    }, 5000);
}


// Mostrar mensajes de éxito
function mostrarExito(mensaje) {
    const elemento = document.getElementById("successMessage");
    if (!elemento) return;
    
    elemento.textContent = mensaje;
    elemento.classList.remove('d-none');

    setTimeout(() => {
        elemento.classList.add('d-none');
        elemento.textContent = '';
    }, 5000);
}

// Formatear fecha
function formatearFecha(fecha) {
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(fecha).toLocaleDateString('es-ES', opciones);
}

export { guardarSesion, obtenerSesion, limpiarSesion, verificarAutenticacion, protegerRuta, redirigirSiAutenticado, mostrarError, mostrarExito, formatearFecha};