import {psql} from '../postgreConnection'

const daoYacimiento = {
    consultarTodos() {
        // RETORNA UNA PROMESA
        return psql.query(`
            SELECT
                Y.y_id_yacimiento,
                Y.y_nombre,
                Y.y_extension,
                Y.yacimiento_configuracion_id,
                Y.tipo_yacimiento_id,
                Y.lugar_id,
                Y.unidad_id,
                U.u_nombre unidad,
                L.l_nombre lugar,
                YC.y_nombre yacimiento_configuracion
            FROM YACIMIENTO Y, LUGAR L, UNIDAD U, YACIMIENTO_CONFIGURACION YC
            WHERE 
                Y.lugar_id = L.l_id_lugar AND
                Y.unidad_id = U.u_id_unidad AND
                Y.yacimiento_configuracion_id = YC.y_id_yacimiento_configuracion
        `)
    },

    consultar( id ){
        return psql.query(`
            SELECT * FROM YACIMIENTO
            WHERE y_id_yacimiento = ${id}
        `)
    },

    eliminar( id ){
        return psql.query(`
            DELETE FROM YACIMIENTO
            WHERE y_id_yacimiento = ${id}
        `)
    },

    insertar({ p_fecha_solicitud, cliente_id }){
        return psql.query(`
            INSERT INTO PEDIDO (p_id_pedido, p_fecha_solicitud, cliente_id)
            VALUES (DEFAULT,
                    ${p_fecha_solicitud ? `'${p_fecha_solicitud}'` : 'NULL'},
                    ${cliente_id ? `'${cliente_id}'` : 'NULL'})`)

    }

}

export {daoYacimiento}