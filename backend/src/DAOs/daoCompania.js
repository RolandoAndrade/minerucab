import {psql} from '../postgreConnection'

const daoCompania = {
    consultarTodos() {
        return psql.query(`
            SELECT * FROM COMPANIA
        `)
    },

    consultar( id ){
        return psql.query(`
            SELECT * FROM COMPANIA
            WHERE c_id_compania = ${id}
        `)
    }
}

export {daoCompania}