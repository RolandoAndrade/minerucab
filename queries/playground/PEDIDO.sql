-- PEDIDOS CON SU PRODUCTO
SELECT PE.p_id_pedido, PE.p_fecha_solicitud, C.c_nombre , PO.p_nombre, PEPO.p_cantidad, PEPO.p_precio_unitario
FROM PEDIDO PE, PEDI_PROD PEPO, PRODUCTO PO, CLIENTE C
WHERE PE.p_id_pedido = PEPO.pedido_id AND
    PO.p_id_producto = PEPO.producto_id AND
    C.c_id_cliente = PE.cliente_id;


-- PRODUCTOS
SELECT * 
FROM PRODUCTO PO;
