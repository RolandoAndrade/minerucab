import {psql} from '../postgreConnection'

const daoPediProd= {

    insertar({p_cantidad, p_precio_unitario, unidad_id, producto_id, pedido_id}){
        return psql.query(`
            INSERT INTO PEDI_PROD (p_id_pedi_prod, p_cantidad, p_precio_unitario, unidad_id, producto_id, pedido_id) 
            VALUES ( 
                DEFAULT,
                ${p_cantidad ? `'${p_cantidad}'` : 'NULL'}, 
                ${p_precio_unitario ? `'${p_precio_unitario}'` : 'NULL'}, 
                ${unidad_id ? `'${unidad_id}'` : 'NULL'}, 
                ${producto_id ? `'${producto_id}'` : 'NULL'} ,
                ${pedido_id ? `'${pedido_id}'` : 'NULL'}
                
            ) RETURNING (p_id_pedi_prod)
        `)
    },
}

export {daoPediProd}