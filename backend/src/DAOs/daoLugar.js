import {psql} from '../postgreConnection'

const daoLugar = {
    consultarTodos() {
        return psql.query(`
            SELECT * FROM LUGAR
        `)
    },

    consultar( id ){
        return psql.query(`
            SELECT * FROM LUGAR
            WHERE l_id_lugar = ${id}
        `)
    },

    consultarTodosPorTipo( l_tipo ){
        return psql.query(`
            SELECT * FROM LUGAR
            WHERE l_tipo = ${l_tipo ? `'${l_tipo}'` : 'NULL'}
        `)
    }
}

export {daoLugar}


