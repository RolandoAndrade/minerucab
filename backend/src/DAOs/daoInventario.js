import {psql} from '../postgreConnection'

const daoInventario = {
    consultarTodos() {
        return psql.query(`
            SELECT * FROM INVENTARIO
        `)
    },

    consultar( id ){
        return psql.query(`
            SELECT * FROM INVENTARIO
            WHERE i_id_inventario = ${id}
        `)
    },

    cantidadMineralGuardado( id )
    {
        return psql.query(`
            SELECT SUM(i_cantidad) total_guardado FROM INVENTARIO
            WHERE mineral_id = ${id} AND 
                  i_ingresado = TRUE
        `)
    }
}

export {daoInventario}
