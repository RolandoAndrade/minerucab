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
            WHERE c_id_cargo = ${id}
        `)
    }
}

export {daoCargo}


