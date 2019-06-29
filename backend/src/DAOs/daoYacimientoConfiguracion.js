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

    insertar (y_nombre,y_capacidad_explotacion,mineral_id,unidad_id){
        return psql.query(`
            INSERT INTO YACIMIENTO_CONFIGURACION 
            (y_id_yacimiento_configuracion,y_nombre,y_capacidad_explotacion,mineral_id,unidad_id) VALUES 
            (DEFAULT,${y_nombre},${y_capacidad_explotacion},${mineral_id},${unidad_id}) RETURNING id;
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