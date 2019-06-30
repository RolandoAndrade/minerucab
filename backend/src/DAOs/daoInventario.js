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

    consultarMovimientosMineral( id ){
        return psql.query(`
            SELECT * FROM INVENTARIO
            WHERE mineral_id = ${id}
        `)
    }
}

export {daoInventario}