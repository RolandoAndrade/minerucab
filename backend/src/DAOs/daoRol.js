import {psql} from '../postgreConnection'

const daoRol= {
    consultarTodos() {
        return psql.query(`
            SELECT R.*
            FROM ROL R
        `)
    },

    consultar( id ){
        return psql.query(`
            SELECT R.*,A.*
            FROM ROL R, ROL_ACCI RA, ACCION A
            WHERE R.r_id_rol=RA.rol_id AND RA.rol_id=${id} AND RA.accion_id = A.a_id_accion
        `)
    },


    eliminar( id ){
        return psql.query(`
            DELETE FROM ROL
            WHERE r_id_rol = ${id}
        `)
    },
 
    insertar({ r_nombre}){
        return psql.query(`
            INSERT INTO ROL (r_id_rol, r_nombre)
            VALUES ( 
                DEFAULT,
                ${r_nombre ? `'${r_nombre}'` : 'NULL'}
            ) RETURNING r_id_rol
        `)
    },

    insertarAccion({rol_id, accion_id}){
        return psql.query(`
            INSERT INTO ROL_ACCI (r_id_rol_acci, rol_id, accion_id)
            VALUES ( 
                DEFAULT,
                ${rol_id ? `'${rol_id}'` : 'NULL'},
                ${accion_id ? `'${accion_id}'` : 'NULL'}
            )
        `)
    },

    modificar({r_id_rol, r_nombre}){
        return psql.query(`
            UPDATE ROL SET
                r_nombre = ${r_nombre ? `'${r_nombre}'` : 'NULL'}
                WHERE r_id_rol = ${r_id_rol}
        `)
    },

    eliminarAccion({r_id_rol}){
        return psql.query(`
            DELETE FROM rol_acci WHERE rol_id=${r_id_rol}
        `)
    },

}

export {daoRol}