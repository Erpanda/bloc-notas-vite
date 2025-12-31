import { supabase } from '../config/supabase.js';
import { guardarSesion } from '../utils/helpers.js';
import { limpiarSesion } from '../utils/helpers.js';

async function registrarUsuario(nombre, apellido, email, password) {
    try {
        // Registro en el auth
        const { data: authData, error: authError} = await supabase.auth.signUp({
            email: email,
            password: password
        });

        if (authError) throw authError;

        // Registro en la tabla usuarios
        const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .insert([
                {
                    id: authData.user.id,
                    nombre: nombre,
                    apellido: apellido
                }
            ])
            .select() //permite devolver la fila
            .single(); // solo espera una fila ._.

        if (profileError) throw profileError;

        return {
            success: true,
            user: authData.user,
            profile: profileData
        };

    } catch(error) {
        // console.error(`Error: ${error}`);
        return {
            success: false,
            error: error.message
        }
    }

};

async function iniciarSesion(email, password) {
    try {
        // obtiene correo y contraseña
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (authError) throw authError;

        // obtiene los datos de la tabla usuarios (profiles)
        const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', authData.user.id) // wjere id_user = id obtenido
            .single();

        if (profileError) throw profileError;

        guardarSesion(authData.user, profileData);

        return {
            success: true,
            user: authData.user,
            profile: profileData
        };

    } catch (error) {
        // console.error('Error en login:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

async function cerrarSesion() {
    try {
        const { error } = await supabase.auth.signOut();
        
        if (error) throw error;

        // Limpiar localStorage, quitando los datos de la sesion
        limpiarSesion();

        return {
            success: true
        };

    } catch (error) {
        console.error('Error en logout:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// Obtener usuario actual de Supabase
async function obtenerUsuarioActual() {
    try {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error) throw error;

        return {
            success: true,
            user: user
        };

    } catch (error) {
        console.error('Error obteniendo usuario:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

export { registrarUsuario, iniciarSesion, cerrarSesion, obtenerUsuarioActual };