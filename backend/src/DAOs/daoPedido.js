import {psql} from '../postgreConnection'

const daoPedido = {
    // CRUD BASICO
    consultarTodos() {
        // RETORNA UNA PROMESA
        return psql.query(`
            SELECT * FROM MINERAL
        `)
    },

    consultar( id ){
        return psql.query(`
            SELECT * FROM MINERAL
            WHERE m_id_mineral = ${id}
        `)
    },

    eliminar( id ){
        return psql.query(`
            DELETE FROM MINERAL
            WHERE m_id_mineral = ${id}
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

}

export {daoPedido}