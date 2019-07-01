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
            FROM PROYECTO P, ESTADO E, YACIMIENTO Y, PEDIDO PE 
            WHERE P.estado_id = E.e_id_estado AND
                P.yacimiento_id = Y.y_id_yacimiento AND
                P.pedido_id = PE.p_id_pedido
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
            FROM PROYECTO P, ESTADO E, YACIMIENTO Y, PEDIDO PE 
            WHERE P.estado_id = E.e_id_estado AND
                P.yacimiento_id = Y.y_id_yacimiento AND
                P.pedido_id = PE.p_id_pedido AND
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

    /*
    eliminar( id ){
        return psql.query(`
            DELETE FROM PROYECTO
            WHERE p_id_proyecto = ${id}
        `)
    },

    
    insertar({ p_fecha_solicitud, cliente_id }){
        return psql.query(`
            INSERT INTO PEDIDO (p_id_pedido, p_fecha_solicitud, cliente_id)
            VALUES (DEFAULT,
                    ${p_fecha_solicitud ? `'${p_fecha_solicitud}'` : 'NULL'},
                    ${cliente_id ? `'${cliente_id}'` : 'NULL'})`)

    },



    modificar({ m_id_mineral, m_nombre, m_tipo, m_radioactivo, m_fecha_nacionalizacion, m_descripcion }){
        return psql.query(`
            UPDATE MINERAL SET
                m_nombre = ${m_nombre ? `'${m_nombre}'` : 'NULL' },
                m_tipo = ${m_tipo ? `'${m_tipo}'` : 'NULL'},
                m_radioactivo = ${m_radioactivo ? 'TRUE' : 'FALSE'},
                m_fecha_nacionalizacion = ${m_fecha_nacionalizacion ? `'${m_fecha_nacionalizacion}'` : 'NULL'},
                m_descripcion = ${m_descripcion ? `'${m_descripcion}'` : 'NULL'}
                WHERE m_id_mineral = ${m_id_mineral}
        `)
    },
    */
}

export {daoProyecto}