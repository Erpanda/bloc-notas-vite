import { protegerRuta, mostrarError, mostrarExito } from '../utils/helpers.js';
import { crearTarea } from '../services/taskService.js';
import { validarTituloTarea, validarDescripcionTarea, validarFechaLimiteTarea } from '../utils/validators.js';
import { cargarNavbar } from '../modules/navbar.js';
import { cargarFooter } from '../modules/footer.js';

protegerRuta();

document.addEventListener('DOMContentLoaded', () => {
    cargarNavbar('crearNota', true);
    cargarFooter();

    cargarFormularioTarea();

    const formNuevaTarea = document.getElementById('formNuevaTarea');
    if (formNuevaTarea) {
        formNuevaTarea.addEventListener('submit', manejarCrearTarea);
    }
})

async function cargarFormularioTarea() {
    const resultado = generarFormularioTarea();

    if (resultado.succes) return;
    else mostrarError('Error al cargar el formulario');
};

async function manejarCrearTarea(e) {
    e.preventDefault();

    const titulo = document.getElementById('tituloTarea').value.trim();
    const descripcion = document.getElementById('descripcionTarea').value.trim();
    const fecha = document.getElementById('fechaLimite').value.trim();

    if (!validarTituloTarea(titulo)) {
        mostrarError('El título es obligatorio y no puede exceder 200 caracteres');
        return;
    }

    if (descripcion && !validarDescripcionTarea(descripcion)) {
        mostrarError('La descripción no puede exceder 500 caracteres');
        return;
    }

    if (fecha && !validarFechaLimiteTarea(fecha)) {
        mostrarError('La fecha no puede ser menor a la actual');
        return;
    }

    // Crear tarea
    const resultado = await crearTarea(titulo, descripcion || null, fecha || null);

    if (resultado.success) {
        mostrarExito('Tarea creada exitosamente');
        e.target.reset();
    } else {
        mostrarError('Error al crear la tarea');
    }
}

function generarFormularioTarea() {
    const formularioTarea = document.getElementById('formularioTarea');

    if (formularioTarea) {
        formularioTarea.innerHTML = `
            <div class="row justify-content-center mx-3 my-5 mx-md-0 my-md-0">
                
                <div class="card shadow-sm border-1 rounded-4 overflow-hidden px-0">
                    <div class="card-header bg-dark text-white py-3 text-center">
                        <h4 class="mb-0">
                            <i class="bi bi-plus-circle me-2"></i>Crear una nueva tarea
                        </h4>
                    </div>
                    <div class="card-body p-4 p-md-5">
                        <form id="formNuevaTarea" class="needs-validation" novalidate>
                            <!-- Título -->
                            <div class="mb-4">
                                <label for="tituloTarea" class="form-label fw-bold">
                                    Título <span class="text-danger">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    class="form-control form-control-lg" 
                                    id="tituloTarea" 
                                    name="title" 
                                    placeholder="Ej: Terminar el proyecto de matemáticas" 
                                    required 
                                    autofocus>
                                <div class="invalid-feedback">
                                    Por favor ingresa un título para la tarea.
                                </div>
                            </div>

                            <!-- Descripción -->
                            <div class="mb-4">
                                <label for="descripcionTarea" class="form-label fw-bold">
                                    Descripción <small class="text-muted">(opcional)</small>
                                </label>
                                <textarea 
                                    class="form-control" 
                                    id="descripcionTarea" 
                                    name="description" 
                                    rows="5" 
                                    placeholder="Detalles adicionales sobre la tarea..."></textarea>
                            </div>

                            <!-- Fecha límite -->
                            <div class="mb-4">
                                <label for="fechaLimite" class="form-label fw-bold">
                                    Fecha límite <small class="text-muted">(opcional)</small>
                                </label>
                                <input 
                                    type="date" 
                                    class="form-control form-control-lg" 
                                    id="fechaLimite" 
                                    name="due_date">
                            </div>

                            <!-- Botones -->
                            <div class="d-grid d-md-flex gap-3 justify-content-md-end">
                                <button type="button" class="btn btn-outline-secondary btn-lg px-5 order-md-2" id="btnCancelar">
                                    Cancelar
                                </button>
                                <button type="submit" class="btn btn-primary btn-lg px-5 order-md-1">
                                    <i class="bi bi-check2 me-2"></i>Crear Tarea
                                </button>
                            </div>
                        <div id="errorMessage" class="alert alert-danger d-none mt-3 mb-0" role="alert"></div>
                        <div id="successMessage" class="alert alert-success d-none mt-3 mb-0" role="alert"></div>
                    </form>
                    </div>
                </div>

            </div>
        `;

        return { succes: true };
    } else {
        return { succes: false }
    }
}
