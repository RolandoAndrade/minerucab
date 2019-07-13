import {psql} from '../postgreConnection'

const daoProyecto  = {
    consultarTodos() {
        return psql.query(`
            SELECT 
                P.p_id_proyecto, 
                P.p_nombre, 
                P.p_fecha_inicio, 
                P.estado_id, E.e_nombre estado, 
                P.yacimiento_id, Y.y_nombre yacimiento, 
                P.pedido_id
            FROM ESTADO E, YACIMIENTO Y, PROYECTO P 
                LEFT OUTER JOIN PEDIDO PE ON P.pedido_id = PE.p_id_pedido
            WHERE P.estado_id = E.e_id_estado AND
                P.yacimiento_id = Y.y_id_yacimiento
        `)
    },

    consultar( id ){
        return psql.query(`
            SELECT 
                P.p_id_proyecto, 
                P.p_nombre, 
                P.p_fecha_inicio, 
                P.estado_id, E.e_nombre estado, 
                P.yacimiento_id, Y.y_nombre yacimiento, 
                P.pedido_id
            FROM ESTADO E, YACIMIENTO Y, PROYECTO P 
                LEFT OUTER JOIN PEDIDO PE ON P.pedido_id = PE.p_id_pedido
            WHERE P.estado_id = E.e_id_estado AND
                P.yacimiento_id = Y.y_id_yacimiento AND
                P.p_id_proyecto = ${id}
        `)
    },

    insertar (p_nombre,p_fecha_inicio,estado_id,yacimiento_id,pedido_id){
        const qry = `
        INSERT INTO PROYECTO 
        (p_id_proyecto,p_nombre,p_fecha_inicio,estado_id,yacimiento_id,pedido_id) VALUES                 
        (DEFAULT,${p_nombre ? `'${p_nombre}'` : 'null'},
        ${p_fecha_inicio ? `'${p_fecha_inicio}'` : 'null'},
        ${estado_id},${yacimiento_id},${pedido_id? pedido_id:'null'}) RETURNING (p_id_proyecto);
        `
        return psql.query(qry)
    },

    eliminar( id ){
        return psql.query(`
            DELETE FROM PROYECTO
            WHERE p_id_proyecto = ${id}
        `)
    },

    modificar (p_id_proyecto,p_nombre,p_fecha_inicio,estado_id,yacimiento_id,pedido_id) {
        const qry = `
        UPDATE PROYECTO
        SET p_nombre = ${p_nombre ? `'${p_nombre}'` : 'null'},
            p_fecha_inicio = ${p_fecha_inicio ? `'${p_fecha_inicio}'` : 'null'},
            estado_id = ${estado_id},
            yacimiento_id = ${yacimiento_id},
            pedido_id = ${pedido_id? pedido_id:'null'}
        WHERE p_id_proyecto = ${p_id_proyecto}
        `
        return psql.query(qry)
    },

    borrarEtapas (id) {
        const qry = `
        DELETE FROM ETAPA
        WHERE proyecto_id = ${id}
        `

        return psql.query(qry)
    }

}

export {daoProyecto}