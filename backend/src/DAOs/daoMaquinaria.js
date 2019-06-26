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
            WHERE c_id_cargo = ${id}
        `)
    }
}

export {daoMaquinaria}