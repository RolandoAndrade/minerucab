import {psql} from '../postgreConnection'

const daoPedido = {
    // CRUD BASICO
    consultarTodos() {
        // RETORNA UNA PROMESA
        return psql.query(`
            SELECT PE.p_id_pedido, PE.p_fecha_solicitud, C.c_nombre , PO.p_nombre,
                   PEPO.p_cantidad, PEPO.p_precio_unitario, 
                   (PEPO.p_cantidad*PEPO.p_precio_unitario*1.16) total, EN.e_nombre
            FROM PEDIDO PE, PEDI_PROD PEPO, PRODUCTO PO, CLIENTE C, (SELECT e_nombre, M.pedido_id
                                                                     FROM ESTADO, PEDI_ESTA, (SELECT MAX(p_id_pedi_esta) q, pedido_id
                                                                                              FROM PEDI_ESTA, ESTADO
                                                                                              WHERE estado_id=e_id_estado
                                                                                                  GROUP BY pedido_id) M
                                                                     WHERE
                                                                         p_id_pedi_esta=M.q AND
                                                                         estado_id=e_id_estado) EN
            WHERE PE.p_id_pedido = PEPO.pedido_id AND
                EN.pedido_id=PE.p_id_pedido AND
                PO.p_id_producto = PEPO.producto_id AND
                C.c_id_cliente = PE.cliente_id;
        `)
    },

    consultar( id ){
        return psql.query(`
            SELECT PE.p_id_pedido, PE.p_fecha_solicitud, C.c_nombre , PO.p_nombre,
                   PEPO.p_cantidad, PEPO.p_precio_unitario, 
                   (PEPO.p_cantidad*PEPO.p_precio_unitario*1.16) total, EN.e_nombre
            FROM PEDIDO PE, PEDI_PROD PEPO, PRODUCTO PO, CLIENTE C, (SELECT e_nombre, M.pedido_id
                                                                     FROM ESTADO, PEDI_ESTA, (SELECT MAX(p_id_pedi_esta) q, pedido_id
                                                                                              FROM PEDI_ESTA, ESTADO
                                                                                              WHERE estado_id=e_id_estado
                                                                                                  GROUP BY pedido_id) M
                                                                     WHERE
                                                                         p_id_pedi_esta=M.q AND
                                                                         estado_id=e_id_estado) EN
            WHERE PE.p_id_pedido = PEPO.pedido_id AND
                EN.pedido_id=PE.p_id_pedido AND
                PE.p_id_pedido=${id} AND
                PO.p_id_producto = PEPO.producto_id AND
                C.c_id_cliente = PE.cliente_id;
        `)
    },

    eliminar( id ){
        return psql.query(`
            DELETE FROM PEDI_PROD
            WHERE pedido_id = ${id}
        `)
    },

    insertar({ p_fecha_solicitud, cliente_id }){
        return psql.query(`
            INSERT INTO PEDIDO (p_id_pedido, p_fecha_solicitud, cliente_id)
            VALUES (DEFAULT,
                    ${p_fecha_solicitud ? `'${p_fecha_solicitud}'` : 'NULL'},
                    ${cliente_id ? `'${cliente_id}'` : 'NULL'}) 
                    RETURNING (p_id_pedido)
            `)
    }  ,

    pagar({p_total, p_fecha_pago,credito_id,debito_id,transferencia_id, cheque_id,pedido_id,unidad_id}){
        return psql.query(`
            INSERT INTO PEDIDO (p_id_pedi_tipo,p_monto, p_fecha_pago,credito_id,debito_id,transferencia_id, cheque_id,pedido_id,unidad_id)
            VALUES (DEFAULT,
                    ${p_total ? `'${p_total}'` : 'NULL'},
                    ${p_fecha_pago ? `'${p_fecha_pago}'` : 'NULL'},
                    ${credito_id ? `'${credito_id}'` : 'NULL'},
                    ${debito_id ? `'${debito_id}'` : 'NULL'},
                    ${transferencia_id ? `'${transferencia_id}'` : 'NULL'},
                    ${cheque_id ? `'${cheque_id}'` : 'NULL'},
                    ${pedido_id ? `'${pedido_id}'` : 'NULL'},
                    ${unidad_id ? `'${unidad_id}'` : 'NULL'}) 
                    RETURNING (p_id_pedi_tipo)
            `)
    }  ,

    insertarCredito({ c_banco, c_numero_tarjeta, c_tipo, c_fecha_vencimiento }){
        return psql.query(`
            INSERT INTO CREDITO (c_id_credito, c_banco, c_numero_tarjeta, c_tipo, c_fecha_vencimiento)
            VALUES (DEFAULT,
                    ${c_banco? `'${c_banco}'` : 'NULL'},
                    ${c_numero_tarjeta ? `'${c_numero_tarjeta}'` : 'NULL'},
                    ${c_tipo ? `'${c_tipo}'` : 'NULL'},
                    ${c_fecha_vencimiento ? `'${c_fecha_vencimiento}'` : 'NULL'}) 
                    RETURNING (p_id_pedido)
            `)
    }  ,
    insertarDebito({ p_fecha_solicitud, cliente_id }){
        return psql.query(`
            INSERT INTO PEDIDO (p_id_pedido, p_fecha_solicitud, cliente_id)
            VALUES (DEFAULT,
                    ${p_fecha_solicitud ? `'${p_fecha_solicitud}'` : 'NULL'},
                    ${cliente_id ? `'${cliente_id}'` : 'NULL'}) 
                    RETURNING (p_id_pedido)
            `)
    }  ,
    insertarCheque({ p_fecha_solicitud, cliente_id }){
        return psql.query(`
            INSERT INTO PEDIDO (p_id_pedido, p_fecha_solicitud, cliente_id)
            VALUES (DEFAULT,
                    ${p_fecha_solicitud ? `'${p_fecha_solicitud}'` : 'NULL'},
                    ${cliente_id ? `'${cliente_id}'` : 'NULL'}) 
                    RETURNING (p_id_pedido)
            `)
    }  ,
    insertarTransferencia({ p_fecha_solicitud, cliente_id }){
        return psql.query(`
            INSERT INTO PEDIDO (p_id_pedido, p_fecha_solicitud, cliente_id)
            VALUES (DEFAULT,
                    ${p_fecha_solicitud ? `'${p_fecha_solicitud}'` : 'NULL'},
                    ${cliente_id ? `'${cliente_id}'` : 'NULL'}) 
                    RETURNING (p_id_pedido)
            `)
    }  ,

}

export {daoPedido}