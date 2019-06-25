import {psql} from '../postgreConnection'

const daoYacimientoConfiguracion = {
    consultarTodos() {
        return psql.query(`
            SELECT * FROM YACIMIENTO_CONFIGURACION
        `)
    },

    consultar( id ){
        return psql.query(`
            SELECT * FROM YACIMIENTO_CONFIGURACION
            WHERE y_id_yacimiento_configuracion = ${id}
        `)
    },

    eliminar( id ){
        return psql.query(`
            DELETE FROM YACIMIENTO_CONFIGURACION
            WHERE y_id_yacimiento_configuracion = ${id}
        `)
    }

}

export {daoYacimientoConfiguracion}