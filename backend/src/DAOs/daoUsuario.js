import {psql} from '../postgreConnection'

const daoUsuario = {

    obtenerUsuario(u_correo, u_clave){
        const query = `
        SELECT * FROM USUARIO
        WHERE u_correo = '${u_correo}'
        AND u_clave = '${u_clave}'
        `
        console.log(query)
        return psql.query(query)
    },

    obtenerPermisos(rol_id) {
        const query = `
        SELECT A.*
        FROM ACCION A, ROL_ACCI R
        WHERE A.a_id_accion = R.accion_id
        AND R.rol_id = ${rol_id}
        `
        console.log(query)
        return psql.query(query)
    },

    validarNombreUsuario (empleado_id,usuarios) {
        console.log("verifando nombres usados")
        let query = `
        SELECT * FROM USUARIO
        WHERE empleado_id != ${empleado_id}
        AND u_correo IN (`
        let i = 0
        usuarios.forEach( u => {
            i++;
            query =  query + `'${u.u_correo}'${i < usuarios.length ? ',' : ');' }`
        })
        console.log(query)
        return psql.query(query)
    },

    eliminarUsuariosEmpleado(empleado_id){
        let query = `
        DELETE FROM USUARIO
        WHERE empleado_id = ${empleado_id}
        `
        
        console.log(query)
        return psql.query(query)
    }

}

export {daoUsuario}
