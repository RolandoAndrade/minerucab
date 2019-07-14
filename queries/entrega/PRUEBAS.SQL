

GROUP BY anio, P.cliente_id, c_nombre, c_rif, p_nombre,WW.cantidad
HAVING SUM(p_cantidad) = WW.cantidad;

