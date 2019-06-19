import {psql} from '../postgreConnection'

const daoMineral = {
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

    insertar( m_nombre, m_metalico, m_radioactivo, m_fecha_nacionalizacion, m_descripcion ){
        return psql.query(`
            INSERT INTO MINERAL (m_id_mineral, m_nombre, m_metalico, m_radioactivo, m_fecha_nacionalizacion, m_descripcion)
            VALUES ( 
                DEFAULT,
                '${m_nombre}', 
                ${m_metalico ? 'TRUE' : 'NULL'}, 
                ${m_radioactivo ? 'TRUE' : 'NULL'}, 
                ${m_fecha_nacionalizacion ? `'${m_fecha_nacionalizacion}'` : 'NULL'}, 
                ${m_descripcion ? `'${m_descripcion}'` : 'NULL'}
            )
        `)
    },

    modificar( m_id_mineral, m_nombre, m_metalico, m_radioactivo, m_fecha_nacionalizacion, m_descripcion ){
        return psql.query(`
            UPDATE MINERAL SET
                m_nombre = '${m_nombre}',
                m_metalico = ${m_metalico ? 'TRUE' : 'NULL'},
                m_radioactivo = ${m_radioactivo ? 'TRUE' : 'NULL'},
                m_fecha_nacionalizacion = ${m_fecha_nacionalizacion ? `'${m_fecha_nacionalizacion}'` : 'NULL'},
                m_descripcion = ${m_descripcion ? `'${m_descripcion}'` : 'NULL'}
                WHERE m_id_mineral = ${m_id_mineral}
        `)
    },


    // EN CASO DE HABER MAS METODOS
    insertarCompuesto( padre, hijo ){
        // POR EJEMPLO
    }
}

export {daoMineral}