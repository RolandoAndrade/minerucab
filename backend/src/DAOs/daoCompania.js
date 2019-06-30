import {psql} from '../postgreConnection'

const daoCompania = {
    consultarTodos() {
        return psql.query(`
            SELECT C.*, L.l_nombre 
            FROM COMPANIA C, LUGAR L
            WHERE C.lugar_id = L.l_id_lugar
        `)
    },

    consultar( id ){
        return psql.query(`
            SELECT * FROM COMPANIA
            WHERE c_id_compania = ${id}
        `)
    },

    eliminar (id) {
        return psql.query(`
            DELETE FROM COMPANIA
            WHERE c_id_compania = ${id}
        `)
    }
}

export {daoCompania}