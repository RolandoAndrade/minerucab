import {psql} from '../postgreConnection'

const daoMaquinaria = {
    consultarTodos() {
        return psql.query(`
            SELECT * FROM MAQUINARIA
        `)
    },

    consultar( id ){
        return psql.query(`
            SELECT * FROM MAQUINARIA
            WHERE m_id_maquinaria = ${id}
        `)
    }
}

export {daoMaquinaria}