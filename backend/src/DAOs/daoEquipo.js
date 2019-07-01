import {psql} from '../postgreConnection'

const daoEquipo = {
    consultarTodos() {
        return psql.query(`
            SELECT * FROM EQUIPO
        `)
    },

    consultar( id ){
        return psql.query(`
            SELECT * FROM EQUIPO
            WHERE e_id_equipo = ${id}
        `)
    }
}

export {daoEquipo}
