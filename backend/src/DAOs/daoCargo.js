import {psql} from '../postgreConnection'

const daoCargo = {
    consultarTodos() {
        return psql.query(`
            SELECT * FROM CARGO
        `)
    },

    consultar( id ){
        return psql.query(`
            SELECT * FROM CARGO
            WHERE l_id_lugar = ${id}
        `)
    }
}

export {daoCargo}


