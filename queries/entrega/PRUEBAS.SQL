SELECT * FROM pedi_prod;

SELECT * FROM pedi_esta

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

SELECT p_id_pedi_esta, e_nombre, pedido_id
FROM PEDI_ESTA, ESTADO
WHERE estado_id=e_id_estado

select * from INVENTARIO


SELECT SUM(i_cantidad) FROM INVENTARIO
WHERE mineral_id = 10 AND
        i_ingresado = TRUE