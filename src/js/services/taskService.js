import { supabase } from '../config/supabase.js';
import { obtenerSesion } from '../utils/helpers.js';

async function obtenerTareas() {
    try {
        const { user } = obtenerSesion();

        if (!user) throw new Error('Usuario no encontrado');

        const {data, error} = await supabase
            .from('tasks')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (error) throw error;
        
        return {
            success: true,
            tasks: data
        };

    } catch(error) {
        console.error(`Error al obtener tareas: ${error}`);
        return {
            success: false,
            error: error.message
        };
    }
}

async function crearTarea(titulo, descripcion = '', fechaLimite = '') {
    try {
        const { user } = obtenerSesion();

        if (!user) throw new Error('Usuario no encontrado');

        const {data, error} = await supabase
            .from('tasks')
            .insert([
                {
                    user_id: user.id,
                    title: titulo,
                    description: descripcion,
                    completed: false,
                    due_date:fechaLimite
                }
            ])
            .select()
            .single();

        if (error) throw error;

        return {
            success: true,
            task: data
        };

    } catch(error) {
        console.error(`Error al registrar tarea: ${error}`);
        return {
            success: false,
            error: error.message
        };
    }
}

async function actualizarTarea(taskId, datos) {
    try {
        const {data, error} = await supabase
            .from('tasks')
            .update(datos)
            .eq('id', taskId)
            .select()
            .single();

        if (error) throw error;

        return {
            success: true,
            task: data
        };

    } catch(error) {
        console.error(`Error al actualizar tarea: ${error}`);
        return {
            success: false,
            error: error.message
        };
    }
}

async function completarTarea(taskId, completado) {
    return await actualizarTarea(taskId, { completed: completado });
}

async function eliminarTarea(taskId) {
    try {
        const { error } = await supabase
            .from('tasks')
            .delete()
            .eq('id', taskId);

        if (error) throw error;

        return {
            success: true
        };

    } catch (error) {
        console.error('Error eliminando tarea:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

async function obtenerTareaPorId(taskId) {
    try {
        const { data, error } = await supabase
            .from('tasks')
            .select('*')
            .eq('id', taskId)
            .single();

        if (error) throw error;

        return {
            success: true,
            task: data
        };

    } catch (error) {
        console.error('Error obteniendo tarea:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

async function obtenerEstadisticasTareas() {
    try {
        const { user } = obtenerSesion();

        if (!user) throw new Error('Usuario no autenticado');

        const { data, error } = await supabase
            .from('tasks')
            .select('completed')
            .eq('user_id', user.id);

        if (error) throw error;

        const total = data.length;
        const completadas = data.filter(task => task.completed).length;
        const pendientes = total - completadas;

        return {
            success: true,
            estadisticas: {
                total,
                completadas,
                pendientes
            }
        };
    } catch (error) {
        console.error('Error obteniendo estadísticas:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

export { obtenerTareas, crearTarea, actualizarTarea, completarTarea, eliminarTarea, obtenerTareaPorId, obtenerEstadisticasTareas };