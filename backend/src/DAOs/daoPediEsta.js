import {psql} from '../postgreConnection'

const daoPediEsta = {
    consultarTodos() {
        return psql.query(`
            SELECT * FROM PEDI_ESTA
        `)
    },

    consultar( id ){
        return psql.query(`
            SELECT * FROM PEDI_ESTA
            WHERE p_id_pedi_esta = ${id}
        `)
    },
    insertar({p_fecha_modificacion, estado_id, pedido_id})
    {
        return psql.query(`
            INSERT INTO PEDI_ESTA (p_id_pedi_esta , p_fecha_modificacion, estado_id, pedido_id) 
            VALUES ( 
                DEFAULT,
                ${p_fecha_modificacion ? `'${p_fecha_modificacion}'` : 'NULL'}, 
                ${estado_id ? `'${estado_id}'` : 'NULL'}, 
                ${pedido_id ? `'${pedido_id}'` : 'NULL'} 
                
            ) RETURNING (p_id_pedi_esta)
        `)
    },
}

export {daoPediEsta}
