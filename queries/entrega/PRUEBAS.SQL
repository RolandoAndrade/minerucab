SELECT P.cliente_id "Codigo de cliente",
       c_nombre "Nombre", c_rif "RIF", p_nombre "Nombre del producto", WW.cantidad,
       EXTRACT(YEAR FROM p_fecha_solicitud)
FROM PEDIDO P, CLIENTE, PEDI_PROD, PRODUCTO, (SELECT cliente_id, anio, MAX(cantidad) cantidad
                                              FROM (SELECT producto_id, cliente_id,
                                                           EXTRACT(YEAR FROM p_fecha_solicitud) anio,
                                                           SUM(p_cantidad) cantidad
                                                    FROM pedi_prod, pedido
                                                    WHERE pedido_id = p_id_pedido
                                                    GROUP BY anio, producto_id, cliente_id) X
                                              GROUP BY anio, cliente_id) WW
WHERE pedido_id = p_id_pedido AND
        P.cliente_id = c_id_cliente AND
        P.cliente_id = WW.cliente_id AND
        producto_id = p_id_producto AND
        EXTRACT(YEAR FROM p_fecha_solicitud) = WW.anio
GROUP BY P.cliente_id, c_nombre, c_rif, p_nombre, WW.cantidad, EXTRACT(YEAR FROM p_fecha_solicitud)
HAVING cantidad = SUM(p_cantidad)

SELECT cliente_id, anio, MAX(cantidad) cantidad
FROM (SELECT producto_id, cliente_id,
             EXTRACT(YEAR FROM p_fecha_solicitud) anio,
             SUM(p_cantidad) cantidad
      FROM pedi_prod, pedido
      WHERE pedido_id = p_id_pedido
      GROUP BY anio, producto_id, cliente_id) X
GROUP BY anio, cliente_id


SELECT producto_id, cliente_id,
       EXTRACT(YEAR FROM p_fecha_solicitud) anio,
       SUM(p_cantidad) cantidad
FROM pedi_prod, pedido
WHERE pedido_id = p_id_pedido
GROUP BY anio, producto_id, cliente_id