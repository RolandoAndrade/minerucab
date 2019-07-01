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
                YC.y_nombre yacimiento_configuracion,
                TY.t_nombre tipo_yacimiento,
                (SELECT COUNT(*) 
                FROM PROYECTO
                WHERE estado_id = 8
                AND yacimiento_id = Y.y_id_yacimiento) AS ocupado
            FROM  LUGAR L, UNIDAD U, YACIMIENTO_CONFIGURACION YC, 
                YACIMIENTO Y FULL OUTER JOIN TIPO_YACIMIENTO TY
                ON Y.tipo_yacimiento_id = TY.t_id_tipo_yacimiento 
            WHERE 
                Y.lugar_id = L.l_id_lugar AND
                Y.unidad_id = U.u_id_unidad AND
                Y.yacimiento_configuracion_id = YC.y_id_yacimiento_configuracion
        `)
    },

    consultar( id ){
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
                YC.y_nombre yacimiento_configuracion,
                TY.t_nombre tipo_yacimiento,
                (
                    SELECT P.p_id_proyecto
                    FROM YACIMIENTO Y, PROYECTO P
                    WHERE Y.y_id_yacimiento = P.yacimiento_id AND
                        Y.y_id_yacimiento = ${id} AND
                        P.estado_id = 8
                    LIMIT 1
                ) AS no_modificable
            FROM  LUGAR L, UNIDAD U, YACIMIENTO_CONFIGURACION YC, 
                YACIMIENTO Y FULL OUTER JOIN TIPO_YACIMIENTO TY
                ON Y.tipo_yacimiento_id = TY.t_id_tipo_yacimiento 
            WHERE 
                Y.lugar_id = L.l_id_lugar AND
                Y.unidad_id = U.u_id_unidad AND
                Y.yacimiento_configuracion_id = YC.y_id_yacimiento_configuracion AND
                y_id_yacimiento = ${id}
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
            UPDATE YACIMIENTO SET 
                y_nombre = ${y_nombre ? `'${y_nombre}'` : 'NULL' },
                y_extension = ${y_extension ? y_extension : 'NULL' },
                yacimiento_configuracion_id = ${yacimiento_configuracion_id ? yacimiento_configuracion_id : 'NULL' },
                tipo_yacimiento_id = ${tipo_yacimiento_id ? tipo_yacimiento_id : 'NULL' },
                lugar_id = ${lugar_id ? lugar_id : 'NULL' },
                unidad_id = ${unidad_id ? unidad_id : 'NULL' }
                WHERE y_id_yacimiento = ${y_id_yacimiento}
        `)
    }

}

export {daoYacimiento}