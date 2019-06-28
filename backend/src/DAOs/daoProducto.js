import {psql} from '../postgreConnection'

const daoProducto= {


    consultarTodos() {
        // RETORNA UNA PROMESA
        return psql.query(`
            SELECT * FROM PRODUCTO
        `)
    },
}

export {daoProducto}