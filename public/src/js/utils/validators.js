// Validar email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Aplicado con los datos del LocalStorage
// Validar que las contraseñas coincidan
function validarPasswordsCoinciden(password, confirmPassword) {
    return password === confirmPassword;
}

// Validar que un campo no esté vacío
function validarCampoNoVacio(valor) {
    return valor.trim().length > 0;
}

// Validar nombre (solo letras y espacios)
function validarNombre(nombre) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return regex.test(nombre) && nombre.trim().length > 0;
}

// Validación completa del formulario de registro
// Algunso datos como el email se verifican con el required
function validarFormularioRegistro(nombre, apellido, password, confirmPassword) {
    const errores = [];
    
    if (!validarNombre(nombre)) {
        errores.push('El nombre solo puede contener letras');
    }
    
    if (!validarNombre(apellido)) {
        errores.push('El apellido solo puede contener letras');
    }
    
    if (!validarPasswordsCoinciden(password, confirmPassword)) {
        errores.push('Las contraseñas no coinciden');
    }
    
    return {
        valido: errores.length === 0,
        errores: errores
    };
}

// Validar título de tarea
function validarTituloTarea(titulo) {
    return validarCampoNoVacio(titulo) && titulo.trim().length <= 200;
}

// Validar descripción de tarea (opcional pero con límite)
function validarDescripcionTarea(descripcion) {
    return descripcion.trim().length <= 500;
}

// Validar fecha límite de tarea (opcional, pero no pasada)
function validarFechaLimiteTarea(fecha) {
    if (!fecha) return true; // opcional

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const fechaLimite = new Date(fecha);
    return fechaLimite >= hoy;
}

export { validarFormularioRegistro, validarTituloTarea, validarDescripcionTarea, validarFechaLimiteTarea };