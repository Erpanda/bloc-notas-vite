PLEASE READ THIS FILE BEFORE STARTING

PROYECTO: LISTA DE TAREAS
=========================

DESCRIPCIÓN
-----------
Aplicación web moderna para la gestión de tareas personales. Permite a los usuarios registrarse, iniciar sesión y administrar sus tareas diarias de manera eficiente. 
El proyecto utiliza una arquitectura basada en módulos de JavaScript y se conecta con Supabase para la persistencia de datos.

CARACTERÍSTICAS PRINCIPALES
---------------------------
1. Autenticación de Usuarios:
   - Registro de nuevos usuarios.
   - Inicio de sesión seguro.
   - Gestión de sesiones (persistencia con localStorage).

2. Gestión de Tareas (CRUD):
   - Crear nuevas tareas con título, descripción y fecha límite.
   - Ver lista de tareas ordenadas por fecha.
   - Marcar tareas como completadas o pendientes.
   - Editar información de las tareas.
   - Eliminar tareas.

3. Panel de Control (Dashboard):
   - Visualización rápida de estadísticas (total, completadas, pendientes).
   - Interfaz limpia y responsiva.

TECNOLOGÍAS UTILIZADAS
----------------------
- Frontend: HTML5, CSS3, JavaScript (Vanilla ES6+ Modules).
- Backend / Base de Datos: Supabase (PostgreSQL + Auth).
- Herramientas: Git (Control de versiones).

ESTRUCTURA DEL PROYECTO
-----------------------
/docs           -> Documentación del proyecto (API.md).
/src
  /assets       -> Recursos estáticos (imágenes, iconos).
  /css          -> Estilos de la aplicación.
  /js
    /config     -> Configuración de servicios externos (Supabase).
    /modules    -> Componentes de UI reutilizables (Navbar, Footer).
    /pages      -> Lógica específica de cada página (Login, Register, Dashboard).
    /services   -> Comunicación con la API/Base de datos.
    /utils      -> Funciones auxiliares y helpers.
index.html      -> Página de entrada (Login).

INSTALACIÓN Y USO
-----------------
1. Requisitos Previos:
   - Un navegador web moderno (Chrome, Firefox, Edge).
   - Conexión a internet (para conectar con Supabase).
   - Servidor local recomendado (ej: Live Server de VS Code) para el correcto funcionamiento de los módulos ES6.

2. Configuración:
   - El proyecto ya incluye las credenciales públicas de Supabase en `src/js/config/supabase.js`.
   - No se requiere instalación de paquetes npm para ejecutar la versión básica, ya que usa imports vía CDN para Supabase.

3. Ejecución:
   - Abrir el archivo `index.html` con un servidor local (Extension Live Server).
   - Registrarse con un correo y contraseña.
   - Comenzar a gestionar tareas.

NOTAS ADICIONALES
-----------------
- La autenticación maneja tokens de sesión que se guardan localmente.
- Para limpiar la sesión manualmente, usar el botón "Cerrar Sesión" en la barra de navegación.

AUTOR
-----
Frank
