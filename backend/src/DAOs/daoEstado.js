import {psql} from '../postgreConnection'

const daoEstado = {
    consultarTodos() {
        return psql.query(`
            SELECT * FROM ESTADO
        `)
    },

    consultar( id ){
        return psql.query(`
            SELECT * FROM ESTADO
            WHERE e_id_estado = ${id}
        `)
    }
}

export {daoEstado}


