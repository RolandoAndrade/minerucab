import {psql} from '../postgreConnection'

const daoCliente = {
    consultarTodos() {
        return psql.query(`
            SELECT C.*, P.l_nombre parroquia,M.l_nombre municipio,E.l_nombre estado FROM CLIENTE C, LUGAR P, LUGAR M, LUGAR E 
            WHERE C.lugar_id= P.l_id_lugar and P.lugar_id=M.l_id_lugar and M.lugar_id = E.l_id_lugar
        `)
    },

    consultar( id ){
        return psql.query(`
            SELECT C.*, P.l_nombre,M.l_nombre,E.l_nombre FROM CLIENTE C, LUGAR P, LUGAR M, LUGAR E 
            WHERE c_id_cliente = ${id} and C.lugar_id= P.l_id_lugar and P.lugar_id=M.l_id_lugar and M.lugar_id = E.l_id_lugar
        `)
    },

    eliminar( id ){
        return psql.query(`
            DELETE FROM CLIENTE
            WHERE c_id_cliente = ${id}
        `)
    },
 
    insertar({ c_rif, c_nombre, c_telefono, lugar_id }){
        return psql.query(`
            INSERT INTO CLIENTE (c_id_cliente, c_rif, c_nombre, c_telefono, lugar_id)
            VALUES ( 
                DEFAULT,
                ${c_rif ? `'${c_rif}'` : 'NULL'}, 
                ${c_nombre ? `'${c_nombre}'` : 'NULL'}, 
                ${c_telefono ? `'${c_telefono}'` : 'NULL'}, 
                ${lugar_id ? lugar_id : 'NULL'}
            )
        `)
    },

    modificar({ c_id_cliente, c_rif, c_nombre, c_telefono, lugar_id }){
        return psql.query(`
            UPDATE CLIENTE SET
                c_nombre = ${c_nombre ? `'${c_nombre}'` : 'NULL'},
                c_rif = ${c_rif ? `'${c_rif}'` : 'NULL'},
                c_telefono = ${c_telefono ? `'${c_telefono}'` : 'NULL'},
                lugar_id = ${lugar_id ? lugar_id : 'NULL'}
                WHERE c_id_cliente = ${c_id_cliente}
        `)
    },


}

export {daoCliente}