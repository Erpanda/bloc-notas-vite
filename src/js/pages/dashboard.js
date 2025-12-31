import { protegerRuta, mostrarError, mostrarExito } from '../utils/helpers.js';
import { obtenerTareas, completarTarea, eliminarTarea, obtenerEstadisticasTareas } from '../services/taskService.js';
import { cargarNavbar } from '../modules/navbar.js';
import { cargarFooter } from '../modules/footer.js';

protegerRuta();

let tareasActuales = [];

document.addEventListener('DOMContentLoaded', () => {
    cargarNavbar('misNotas', true);
    cargarFooter();

    generarContenedorNotas();
    cargarEstadisticas();
    cargarTareas();
});

async function cargarEstadisticas() {
    const resultado = await obtenerEstadisticasTareas();

    if (resultado.success) {
        const {
            total = 0,
            completadas = 0,
            pendientes = 0
        } = resultado.estadisticas ?? {};

        document.getElementById('totalTareas').textContent = total;
        document.getElementById('tareasCompletadas').textContent = completadas;
        document.getElementById('tareasPendientes').textContent = pendientes;
    }
};

async function cargarTareas() {
    const resultado = await obtenerTareas();

    if (resultado.success) {
        tareasActuales = resultado.tasks;
        mostrarTareas(tareasActuales);
    } else {
        mostrarError('Error al cargar las tareas');
    }
};

async function mostrarTareas(tareas) {
    const contenedor = document.getElementById('listaTareas');

    if (!contenedor) return;
    
    if (tareas.length === 0) {
        contenedor.classList.add('justify-content-center');
        contenedor.innerHTML = `
            <div class="d-flex justify-content-center align-items-center text-center text-muted py-5">
                <p class="mb-0">No tienes tareas todavía. ¡Crea una nueva!</p>
            </div>
        `;
        return;
    }

    contenedor.innerHTML = tareas.map(tarea => `
        <div class="col">
            <div class="card mb-3 border-start ${tarea.completed ? 'border-success border-4 bg-light' : 'border-warning border-4'}">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start">
                        <div class="flex-grow-1">
                            <h5 class="card-title ${tarea.completed ? 'text-decoration-line-through text-muted' : ''} fw-bold">
                                ${tarea.title}
                            </h5>
                            <p class="card-text text-muted">${tarea.description}</p>
                            <p class="card-text text-muted">Fecha límite: <span class="text-black fw-bold">${tarea.due_date ? new Date(tarea.due_date).toISOString().split('T')[0] : '-'}</span></p>
                            <small class="${tarea.completed ? 'text-success' : 'text-muted'} fs-6">Estado: 
                                ${tarea.completed ? 'Completada' : 'Pendiente'}
                            </small>
                        </div>
                    </div>
                    <div class="d-flex gap-2 mt-3">
                        <button 
                            class="btn btn-sm ${tarea.completed ? 'btn-warning' : 'btn-primary'}"
                            onclick="toggleTarea('${tarea.id}', ${tarea.completed})">
                            ${tarea.completed ? 'Reiniciar' : 'Completar'}
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="eliminarTareaClick('${tarea.id}')">
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
};

// Toggle completar/descompletar tarea
window.toggleTarea = async function(taskId, completado) {
    const resultado = await completarTarea(taskId, !completado);
    
    if (resultado.success) {
        cargarTareas();
        cargarEstadisticas();
    } else {
        mostrarError('Error al actualizar la tarea');
    }
};

// Eliminar tarea
window.eliminarTareaClick = async function(taskId) {    
    const resultado = await eliminarTarea(taskId);
    
    if (resultado.success) {
        mostrarExito('Tarea eliminada');
        cargarEstadisticas();
        cargarTareas();
    } else {
        mostrarError('Error al eliminar la tarea');
    }
};

async function generarContenedorNotas() {
    const contenedorGeneral = document.getElementById("contenedorMain");

    if (contenedorGeneral) {
        contenedorGeneral.innerHTML = `
            <div class="mb-4" id="contenedorEstadisticas">
                <h2 class="mb-4 display-6 fw-bold border-bottom border-3 border-black pb-2">Estadísticas</h2>
                
                <!-- Grid responsive con gutters -->
                <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    
                    <div class="col">
                        <div class="card text-bg-success h-100 border-0 shadow-sm">
                            <div class="card-header fw-bold">Tareas Completadas</div>
                            <div class="card-body">
                                <h5 class="card-title display-6" id="tareasCompletadas"></h5>
                                <p class="card-text mb-0">Tareas finalizadas con éxito esta semana.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card text-bg-danger h-100 border-0 shadow-sm">
                            <div class="card-header fw-bold">Tareas Pendientes</div>
                            <div class="card-body">
                                <h5 class="card-title display-6" id="tareasPendientes"></h5>
                                <p class="card-text mb-0">Requieren atención inmediata.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card text-bg-light h-100 border-0 shadow-sm">
                            <div class="card-header fw-bold text-dark">Total de Tareas</div>
                            <div class="card-body">
                                <h5 class="card-title display-6 text-dark" id="totalTareas"></h5>
                                <p class="card-text mb-0 text-muted">Registradas en el sistema.</p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>

            <div class="mb-4" id="contenedorTareas">
        
                <h2 class="mb-4 display-6 fw-bold border-bottom border-3 border-black pb-2">Mis Tareas</h2>
                <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4" id="listaTareas">
                    <!-- lista de tareas -->
                </div>

            </div>`;
    }
};
