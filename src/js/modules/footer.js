function generarFooter() {
    const anioActual = new Date().getFullYear();

    const footerHTML = `
        <footer class="bg-dark text-light pt-4 pb-3 mt-auto">
            <div class="container">
                <div class="row g-4">
                    
                    <div class="col-6 col-md-4 text-center text-md-start">
                        <h5 class="fw-bold">BlocNotas</h5>
                        <p class="text-secondary small">
                            Cada día, generando y almacenando recuerdos.
                        </p>
                    </div>
                    
                    <div class="col-6 col-md-4 text-center text-md-start">
                        <h6 class="fw-semibold">Navegación</h6>
                        <ul class="list-unstyled">
                            <li class="mb-2"><a href="crearTarea" class="text-secondary text-decoration-none">Crear nota</a></li>
                            <li class="mb-2"><a href="dashboard" class="text-secondary text-decoration-none">Mis notas</a></li>
                        </ul>
                    </div>
                    
                    <div class="col-12 col-md-4 text-center text-md-start">
                        <h6 class="fw-semibold">Proyecto</h6>
                        <p class="text-secondary small mb-1">Hecho con Bootstrap y Supabase</p>
                        <p class="text-secondary small">© ${anioActual} BlocNotas</p>
                    </div>
                </div>

                <hr class="border-secondary my-3">

                <div class="text-center text-secondary small">
                    Diseñado para crecer, no para olvidar.
                </div>
            </div>
        </footer>
    `;

    return footerHTML;
}

// Cargar footer en el elemento con id="footer"
function cargarFooter() {
    const footerContainer = document.getElementById('footer');
    if (footerContainer) {
        footerContainer.innerHTML = generarFooter();
    }
}

export { cargarFooter };