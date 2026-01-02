import { obtenerSesion } from '../utils/helpers.js';
import { cerrarSesion } from '../services/authService.js';

function generarNavbar(paginaActual = '', estaAutenticado = false) {
    const { profile } = obtenerSesion();

    const navbarHTML = `
        <nav class="navbar fixed-top bg-dark border-bottom border-body navbar-expand-lg" data-bs-theme="dark">
            <div class="container-fluid">
                <a class="navbar-brand d-flex align-items-center gap-2 text-light" href="dashboard">
                    <img src="/log.png" alt="logo" width="40" height="40">
                    <!-- d-none d-sm-inline: permite ocultar algo en dispositivos pequeños y mostrarlo en dispositivos grandes (span) -->
                    <!-- d-none d-lg-block: lo mismo pero en dispositivos grandes (div) -->
                    <span class="fs-5 fw-bold d-none d-sm-inline">BlocNotas</span>
                </a>
                ${estaAutenticado && profile ? `
                    <div class="ms-auto text-light fw-medium me-3">Bienvenido, <strong>${profile.nombre} ${profile.apellido}</strong></div>
                ` : ``}
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
                        data-bs-target="#navbarSupportedContent" 
                        aria-controls="navbarSupportedContent" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link ${paginaActual === 'misNotas' ? 'active' : ''}"
                            ${paginaActual === 'misNotas' ? 'aria-current="page"' : ''}
                            href="dashboard">
                                Mis notas
                            </a>
                        </li>    
                        <li class="nav-item">
                            <a class="nav-link ${paginaActual === 'crearNota' ? 'active' : ''}"
                            ${paginaActual === 'crearNota' ? 'aria-current="page"' : ''}
                            href="crearTarea">
                                Crear nota
                            </a>
                        </li>
                        <li class="nav-item">
                            <button class="nav-link btn btn-link text-danger" id="btnLogout">Cerrar Sesión</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    `;

    return navbarHTML;
}

// Cargar navbar en el elemento con id="navbar"
function cargarNavbar(paginaActual = '', estaAutenticado = false) {
    const navbarContainer = document.getElementById('navbar');
    if (navbarContainer) {
        navbarContainer.innerHTML = generarNavbar(paginaActual, estaAutenticado);
        
        // Agregar evento al botón de logout
        const btnLogout = document.getElementById('btnLogout');
        if (btnLogout) {
            btnLogout.addEventListener('click', manejarLogout);
        }
    }
}

// Cerrar sesión (function)
async function manejarLogout() {    
    const resultado = await cerrarSesion();
    
    if (resultado.success) {
        window.location.href = 'index';
    } else {
        alert('Error al cerrar sesión. Intenta de nuevo.');
    }
}

export { cargarNavbar };