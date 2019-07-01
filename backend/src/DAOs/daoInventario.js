import {psql} from '../postgreConnection'

const daoInventario = {
    consultarTodos() {
        return psql.query(`
            SELECT M.m_id_mineral, M.m_nombre,
                   (SELECT sum(i_cantidad) FROM INVENTARIO
                    WHERE mineral_id = M.m_id_mineral
                      and i_ingresado = true) -
                   (SELECT sum(i_cantidad) FROM INVENTARIO
                    WHERE mineral_id = m.m_id_mineral
                      and i_ingresado = false) as cantidad_actual
            FROM MINERAL M
            WHERE m.m_id_mineral IN (SELECT distinct mineral_id FROM INVENTARIO)
        `)
    },

    consultar( id ){
        return psql.query(`
            SELECT * FROM INVENTARIO
            WHERE i_id_inventario = ${id}
        `)
    },
    todosLosMovimientos( ){
        return psql.query(`
            SELECT I.*, M.m_nombre 
            FROM INVENTARIO I, MINERAL M 
            WHERE M.m_id_mineral=I.mineral_id
        `)
    },

    cantidadMineralGuardado( id )
    {
        return psql.query(`
            SELECT M.m_id_mineral, M.m_nombre, 
                (SELECT sum(i_cantidad) FROM INVENTARIO
                WHERE mineral_id = M.m_id_mineral
                and i_ingresado = true) - 
                (SELECT sum(i_cantidad) FROM INVENTARIO
                WHERE mineral_id = m.m_id_mineral
                and i_ingresado = false) as cantidad_actual
            FROM MINERAL M
            WHERE m.m_id_mineral IN (SELECT distinct mineral_id FROM INVENTARIO)
            AND m.m_id_mineral = ${id}
        `)
    },

    consultarMovimientosMineral( id ){
        return psql.query(`
            SELECT * FROM INVENTARIO
            WHERE mineral_id = ${id}
        `)
    },

    insertar({i_cantidad, i_ingresado,i_fecha_modificacion, mineral_id, unidad_id,proyecto_id, solicitud_id ,pedido_id  }){
        return psql.query(`
            INSERT INTO INVENTARIO (i_id_inventario,i_cantidad,i_ingresado,i_fecha_modificacion,mineral_id,unidad_id,proyecto_id,solicitud_id,pedido_id) 
                VALUES (DEFAULT,
                    ${i_cantidad ? `'${i_cantidad}'` : 'NULL'},
                    ${i_ingresado ? `'${i_ingresado}'` : false},
                    ${i_fecha_modificacion ? `'${i_fecha_modificacion}'` : 'NULL'},
                    ${mineral_id ? `'${mineral_id}'` : 'NULL'},
                    ${unidad_id ? `'${unidad_id}'` : 'NULL'},
                    ${proyecto_id ? `'${proyecto_id}'` : 'NULL'},
                    ${solicitud_id ? `'${solicitud_id}'` : 'NULL'},
                    ${pedido_id ? `'${pedido_id}'` : 'NULL'}
                    ) 
                    RETURNING (i_id_inventario)
            `)
    }  ,
}

export {daoInventario}
