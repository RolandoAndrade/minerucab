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

    insertar({ m_nombre, m_tipo, m_radioactivo, m_fecha_nacionalizacion, m_descripcion }){
        return psql.query(`
            INSERT INTO MINERAL (m_id_mineral, m_nombre, m_tipo, m_radioactivo, m_fecha_nacionalizacion, m_descripcion) 
            VALUES ( 
                DEFAULT,
                ${m_nombre ? `'${m_nombre}'` : 'NULL' }, 
                ${m_tipo ? `'${m_tipo}'` : 'NULL'}, 
                ${m_radioactivo ? 'TRUE' : 'FALSE'}, 
                ${m_fecha_nacionalizacion ? `'${m_fecha_nacionalizacion}'` : 'NULL'}, 
                ${m_descripcion ? `'${m_descripcion}'` : 'NULL'}
            ) RETURNING (m_id_mineral)
        `)
    },

    insertarCompuestos(m_id_mineral, compuestos){
        let query = `INSERT INTO MINE_MINE (m_id_mine_mine, mineral_id_compuesto, mineral_id_compone) VALUES `
        let i = 0
        compuestos.forEach(c => {
            i++;
            query = query + `(DEFAULT, ${m_id_mineral}, ${c.m_id_mineral})${i < compuestos.length ? ',' : ';' } `
        })

        return psql.query(query)
    },

    eliminarCompuestos( m_id_mineral ){
        return psql.query(`
            DELETE FROM MINE_MINE 
            WHERE mineral_id_compuesto = ${m_id_mineral}
        `)
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

    consultarHijos({ m_id_mineral }){
        return psql.query(`
            SELECT M.m_nombre, M.m_id_mineral
            FROM MINERAL M, MINE_MINE MM
            WHERE	M.m_id_mineral = MM.mineral_id_compone AND
                    MM.mineral_id_compuesto = ${m_id_mineral}
        `)
    },

    consultarPosiblesHijos({ m_id_mineral }){
        // TODOS LOS MINERALES MENOS EL MISMO Y SUS PADRES
        return psql.query(`
            SELECT M.m_nombre, M.m_id_mineral
            FROM MINERAL M
            WHERE M.m_id_mineral != ${m_id_mineral} AND
                M.m_id_mineral NOT IN( 
                    SELECT M.m_id_mineral
                    FROM MINERAL M, MINE_MINE MM
                    WHERE	M.m_id_mineral = MM.mineral_id_compuesto AND
                            MM.mineral_id_compone = ${m_id_mineral}
                )
        `)
    }
}

export {daoMineral}