-- PROYECTOS
SELECT P.p_id_proyecto, P.p_nombre, P.p_fecha_inicio, P.estado_id, E.e_nombre, P.yacimiento_id, Y.y_nombre, P.pedido_id
FROM PROYECTO P, ESTADO E, YACIMIENTO Y, PEDIDO PE 
WHERE P.estado_id = E.e_id_estado AND
    P.yacimiento_id = Y.y_id_yacimiento AND
    P.pedido_id = PE.p_id_pedido