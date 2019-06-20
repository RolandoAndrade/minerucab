import {psql} from '../postgreConnection'

const daoCliente = {
    consultarTodos() {
        return psql.query(`
            SELECT * FROM CLIENTE
        `)
    },

    consultar( id ){
        return psql.query(`
            SELECT * FROM CLIENTE
            WHERE c_id_cliente = ${id}
        `)
    },

    eliminar( id ){
        return psql.query(`
            DELETE FROM CLIENTE
            WHERE c_id_cliente = ${id}
        `)
    },
 
    insertar( c_rif, c_nombre, c_telefono, lugar_id ){
        return psql.query(`
            INSERT INTO CLIENTE (c_id_cliente, c_rif, c_nombre, c_telefono, lugar_id)
            VALUES ( 
                DEFAULT,
                ${c_rif ? `'${c_rif}'` : 'NULL'}, 
                '${c_nombre}', 
                ${c_telefono ? `'${c_telefono}'` : 'NULL'}, 
                ${lugar_id}
            )
        `)
    },

    modificar( c_id_cliente, c_rif, c_nombre, c_telefono, lugar_id ){
        return psql.query(`
            UPDATE CLIENTE SET
                c_nombre = '${c_nombre}',
                c_rif = ${c_rif ? `'${c_rif}'` : 'NULL'},
                c_telefono = ${c_telefono ? `'${c_telefono}'` : 'NULL'},
                lugar_id = ${lugar_id ? `'${lugar_id}'` : 'NULL'}
                WHERE c_id_cliente = ${c_id_cliente}
        `)
    },


}

export {daoCliente}