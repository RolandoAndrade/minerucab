import {psql} from '../postgreConnection'

const daoYacimiento = {
    consultarTodos() {
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

    insertar({ y_nombre , y_extension , yacimiento_configuracion_id , tipo_yacimiento_id , lugar_id , unidad_id }){
        return psql.query(`
            INSERT INTO YACIMIENTO (y_id_yacimiento , y_nombre , y_extension , yacimiento_configuracion_id , tipo_yacimiento_id , lugar_id , unidad_id)
            VALUES (
                DEFAULT,
                ${y_nombre ? `'${y_nombre}'` : 'NULL' },
                ${y_extension ? y_extension : 'NULL' },
                ${yacimiento_configuracion_id ? yacimiento_configuracion_id : 'NULL' },
                ${tipo_yacimiento_id ? tipo_yacimiento_id : 'NULL' },
                ${lugar_id ? lugar_id : 'NULL' },
                ${unidad_id ? unidad_id : 'NULL' }
            )
        `)
    },

    modificar({ y_id_yacimiento, y_nombre , y_extension , yacimiento_configuracion_id , tipo_yacimiento_id , lugar_id , unidad_id }){
        return psql.query(`
            UPDATE PEDIDO SET 
                y_nombre = ${y_nombre ? `'${y_nombre}'` : 'NULL' },
                y_extension = ${y_extension ? y_extension : 'NULL' },
                yacimiento_configuracion_id = ${yacimiento_configuracion_id ? yacimiento_configuracion_id : 'NULL' },
                tipo_yacimiento_id = ${tipo_yacimiento_id ? tipo_yacimiento_id : 'NULL' },
                lugar_id = ${lugar_id ? lugar_id : 'NULL' },
                unidad_id = ${unidad_id ? unidad_id : 'NULL' }
                WHERE y_id_yacimiento = ${y_id_yacimiento}
            )
        `)
    }

}

export {daoYacimiento}