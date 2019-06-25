import {psql} from '../postgreConnection'

const daoTipoYacimiento = {
    consultarTodos() {
        return psql.query(`
            SELECT * FROM TIPO_YACIMIENTO
        `)
    },

    consultar( id ){
        return psql.query(`
            SELECT * FROM TIPO_YACIMIENTO
            WHERE t_id_yacimiento = ${id}
        `)
    },

    eliminar( id ){
        return psql.query(`
            DELETE FROM TIPO_YACIMIENTO
            WHERE t_id_yacimiento = ${id}
        `)
    }

}

export {daoTipoYacimiento}