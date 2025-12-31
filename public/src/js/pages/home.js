import { cargarFooter } from '../modules/footer.js';
import { redirigirSiAutenticado } from '../utils/helpers.js';

redirigirSiAutenticado();

document.addEventListener('DOMContentLoaded', () => {
    cargarFooter();
});