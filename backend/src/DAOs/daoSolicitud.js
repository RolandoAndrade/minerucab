import {psql} from '../postgreConnection'

const daoSolicitud = {
    consultarTodos() {
        return psql.query(`
            SELECT S.*, P.p_nombre, E.e_nombre
            FROM SOLICITUD S, PROYECTO P, ESTADO E
            WHERE S.proyecto_id = P.p_id_proyecto
            AND S.estado_id = E.e_id_estado
        `)
    },

    consultar( id ){
        return psql.query(`
            SELECT S.*, P.p_nombre, E.e_nombre
            FROM SOLICITUD S, PROYECTO P, ESTADO E
            WHERE S.proyecto_id = P.p_id_proyecto
            AND S.estado_id = E.e_id_estado
            AND S.s_id_solicitud = ${id}
        `)
    },

    eliminar( id ){
        return psql.query(`
            DELETE FROM SOLICITUD
            WHERE s_id_solicitud = ${id}
        `)
    }

}

export {daoSolicitud}