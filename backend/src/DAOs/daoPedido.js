import {psql} from '../postgreConnection'

const daoPedido = {
    // CRUD BASICO
    consultarTodos() {
        // RETORNA UNA PROMESA
        return psql.query(`
            SELECT PE.p_id_pedido, PE.p_fecha_solicitud, C.c_nombre , PO.p_nombre,
                   PEPO.p_cantidad, PEPO.p_precio_unitario, 
                   (PEPO.p_cantidad*PEPO.p_precio_unitario*1.16) total, EN.e_nombre, PO.mineral_id
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

    pagar({total, p_fecha_pago,c_id_credito,d_id_debito,t_id_transferencia, c_id_cheque,p_id_pedido,unidad_id}){
        return psql.query(`
            INSERT INTO PEDI_TIPO (p_id_pedi_tipo,p_monto, p_fecha_pago,credito_id,debito_id,transferencia_id, cheque_id,pedido_id,unidad_id)
            VALUES (DEFAULT,
                    ${total ? `'${total}'` : 'NULL'},
                    ${p_fecha_pago ? `'${p_fecha_pago}'` : 'NULL'},
                    ${c_id_credito ? `'${c_id_credito}'` : 'NULL'},
                    ${d_id_debito ? `'${d_id_debito}'` : 'NULL'},
                    ${t_id_transferencia ? `'${t_id_transferencia}'` : 'NULL'},
                    ${c_id_cheque ? `'${c_id_cheque}'` : 'NULL'},
                    ${p_id_pedido ? `'${p_id_pedido}'` : 'NULL'},
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
                    RETURNING (c_id_credito)
            `)
    }  ,
    insertarDebito({ d_numero_tarjeta, d_banco }){
        return psql.query(`
            INSERT INTO DEBITO (d_id_debito, d_banco, d_numero_tarjeta)
            VALUES (DEFAULT,
                    ${d_banco ? `'${d_banco}'` : 'NULL'},
                    ${d_numero_tarjeta ? `'${d_numero_tarjeta}'` : 'NULL'}) 
                    RETURNING (d_id_debito)
            `)
    }  ,
    insertarCheque({ c_numero_cheque, c_banco, c_numero_cuenta }){
        return psql.query(`
            INSERT INTO CHEQUE (c_id_cheque, c_numero_cheque, c_banco, c_numero_cuenta)
            VALUES (DEFAULT,
                    ${c_numero_cheque ? `'${c_numero_cheque}'` : 'NULL'},
                    ${c_banco ? `'${c_banco}'` : 'NULL'},
                    ${c_numero_cuenta ? `'${c_numero_cuenta}'` : 'NULL'}) 
                    RETURNING (c_id_cheque)
            `)
    }  ,
    insertarTransferencia({ t_banco, t_numero_transferencia }){
        return psql.query(`
            INSERT INTO PEDIDO (t_id_transferencia, t_banco, t_numero_transferencia)
            VALUES (DEFAULT,
                    ${t_banco ? `'${t_banco}'` : 'NULL'},
                    ${t_numero_transferencia ? `'${t_numero_transferencia}'` : 'NULL'}) 
                    RETURNING (t_id_transferencia)
            `)
    }  ,

    consultarPago(id)
    {
        return psql.query(`
            SELECT * FROM PEDI_TIPO WHERE pedido_id=${(id)}
            `)
    },

    consultarCredito(id)
    {
        return psql.query(`
            SELECT * FROM CREDITO WHERE c_id_credito=${(id)}
            `)
    },

    consultarDebito(id)
    {
        return psql.query(`
            SELECT * FROM DEBITO WHERE d_id_debito=${(id)}
            `)
    },
    consultarCheque(id)
    {
        return psql.query(`
            SELECT * FROM CHEQUE WHERE c_id_cheque=${(id)}
            `)
    },

    consultarTransferencia(id)
    {
        return psql.query(`
            SELECT * FROM TRANSFERENCIA WHERE t_id_transferencia=${(id)}
            `)
    },

}

export {daoPedido}