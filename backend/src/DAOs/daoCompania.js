import {psql} from '../postgreConnection'

const daoCompania = {
    consultarTodos() {
        return psql.query(`
            SELECT C.*, P.l_nombre parroquia,M.l_nombre municipio,E.l_nombre estado FROM COMPANIA C, LUGAR P, LUGAR M, LUGAR E 
            WHERE C.lugar_id= P.l_id_lugar and P.lugar_id=M.l_id_lugar and M.lugar_id = E.l_id_lugar
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