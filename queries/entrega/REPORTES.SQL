/*Empresa aliada a la que se le realizaron más compras*/

SELECT c_id_compania "Código de la empresa", c_rif "RIF", c_nombre "Nombre de la empresa",
       c_nacionalizado "¿Está nacionalizada?", c_fecha_nacional "Fecha de nacionalización",
       c_fecha_apertura "Fecha de inauguración", c_capacidad_maxima_anual "Producción anual",
       u_nombre "Unidad de producción", E.l_nombre "Estado" , M.l_nombre "Municipio",P.l_nombre "Parroquia",
       compras "Compras realizadas"
FROM
    COMPANIA C, UNIDAD, LUGAR P, LUGAR M, LUGAR E,
    (SELECT compania_id compania, COUNT(*) compras
     FROM PROD_COMP
     GROUP BY compania_id
     HAVING COUNT(*) =
            (SELECT MAX(compras)
             FROM    (SELECT compania_id, COUNT(*) compras
                      FROM PROD_COMP
                      GROUP BY compania_id) q
            )) Q
WHERE c_id_compania = compania AND
        unidad_id = u_id_unidad AND
        C.lugar_id = P.l_id_lugar AND
        P.lugar_id = M.l_id_lugar AND
        M.lugar_id = E.l_id_lugar;

/*Fases que presentan retrasos*/

SELECT p_nombre "Proyecto",
       e_nombre "Etapa atrasada",
       e_orden "Número de etapa",
       f_id_fase "Código de la fase",
       f_nombre "Fase atrasada",
       f_orden "Número de fase",
       f_fecha_fin "Fecha de fin pautada"
FROM FASE, FASE_CONFIGURACION, ETAPA, ETAPA_CONFIGURACION, PROYECTO
WHERE fase_configuracion_id = f_id_fase_configuracion AND
        etapa_id = e_id_etapa AND
        proyecto_id = p_id_proyecto AND
        etapa.etapa_configuracion_id = e_id_etapa_configuracion AND
    (f_fecha_fin BETWEEN '2018-10-10' AND '2019-10-10') AND
        fase.estado_id != 2;


/*Listado de fases y etapas del proyecto*/

SELECT p_nombre "Nombre del proyecto",
       p_fecha_inicio "Fecha de inicio de proyecto",
       E.e_nombre "Etapa",
       e_orden "Numero de etapa",
       e_fecha_inicio "Fecha de inicio de etapa",
       f_nombre "Nombre de la fase",
       f_orden "Numero de fase",
       f_fecha_inicio "Fecha de inicio de fase pautada",
       f_fecha_fin "Fecha de fin de fase pautada",
       S.e_nombre "Estado de la fase"
FROM FASE, FASE_CONFIGURACION, ETAPA, ETAPA_CONFIGURACION E, PROYECTO, ESTADO S
WHERE fase_configuracion_id = f_id_fase_configuracion AND
        etapa_id = e_id_etapa AND
        proyecto_id = p_id_proyecto AND
        etapa.etapa_configuracion_id = e_id_etapa_configuracion AND
        fase.estado_id = s.e_id_estado AND
    f_fecha_inicio BETWEEN '1998-01-01' AND now();

/*Proyecto mas costoso por mes.*/

SELECT XXX.* FROM
                 (SELECT E.proyecto_id, E.salarios "Gastos en salarios", M.gastos "Gastos en equipo",
                         viaticos "Viáticos", GA.monto "Gastos adicionales",
                         coalesce(M.gastos,0)+coalesce(E.salarios+viaticos,0)+coalesce(GA.monto,0) "Total", E.mes, E.año
                  FROM
                      (SELECT SUM(f_salario) salarios, SUM(f_viatico) viaticos, proyecto_id,
                              EXTRACT(MONTH FROM f_fecha_inicio) mes, EXTRACT(YEAR FROM f_fecha_inicio) año
                       FROM fase_empl, etapa, fase
                       WHERE fase_id = f_id_fase AND
                               etapa_id = e_id_etapa
                       GROUP BY proyecto_id, mes, año) E FULL JOIN
                      (SELECT SUM(f_costo_alquiler) gastos, proyecto_id, EXTRACT(MONTH FROM f_fecha_inicio) mes, EXTRACT(YEAR FROM f_fecha_inicio) año
                       FROM fase_equi, fase, etapa
                       WHERE fase_id = f_id_fase AND
                               etapa_id = e_id_etapa
                       GROUP BY proyecto_id, mes, año) M ON E.proyecto_id = M.proyecto_id
                                                         FULL JOIN (SELECT SUM(g_monto) monto, proyecto_id,  EXTRACT(MONTH FROM f_fecha_inicio) mes, EXTRACT(YEAR FROM f_fecha_inicio) año
                                                                    FROM gasto_adicional, fase, etapa
                                                                    WHERE fase_id = f_id_fase AND
                                                                            etapa_id = e_id_etapa
                                                                    GROUP BY proyecto_id, mes, año) GA ON (GA.proyecto_id = E.proyecto_id)) XXX,
                 (SELECT MAX(coalesce(M.gastos,0)+coalesce(E.salarios+viaticos,0)+coalesce(GA.monto,0)) total, E.mes, E.año
                  FROM
                      (SELECT SUM(f_salario) salarios, SUM(f_viatico) viaticos, proyecto_id,
                              EXTRACT(MONTH FROM f_fecha_inicio) mes, EXTRACT(YEAR FROM f_fecha_inicio) año
                       FROM fase_empl, etapa, fase
                       WHERE fase_id = f_id_fase AND
                               etapa_id = e_id_etapa
                       GROUP BY proyecto_id, mes, año) E FULL JOIN
                      (SELECT SUM(f_costo_alquiler) gastos, proyecto_id, EXTRACT(MONTH FROM f_fecha_inicio) mes, EXTRACT(YEAR FROM f_fecha_inicio) año
                       FROM fase_equi, fase, etapa
                       WHERE fase_id = f_id_fase AND
                               etapa_id = e_id_etapa
                       GROUP BY proyecto_id, mes, año) M ON E.proyecto_id = M.proyecto_id
                                                         FULL JOIN (SELECT SUM(g_monto) monto, proyecto_id,  EXTRACT(MONTH FROM f_fecha_inicio) mes, EXTRACT(YEAR FROM f_fecha_inicio) año
                                                                    FROM gasto_adicional, fase, etapa
                                                                    WHERE fase_id = f_id_fase AND
                                                                            etapa_id = e_id_etapa
                                                                    GROUP BY proyecto_id, mes, año) GA ON (GA.proyecto_id = E.proyecto_id)
                  GROUP BY E.mes, E.año) YYY
WHERE YYY.mes=XXX.mes AND XXX.año=YYY.año AND XXX."Total"=YYY.total;


/*TOP 10 MEJORES CLIENTES*/

SELECT cliente_id "Codigo de cliente",
       c_nombre "Nombre", c_rif "RIF", SUM(p_monto) "Total en pagos"
FROM PEDI_TIPO, PEDIDO, CLIENTE
WHERE pedido_id = p_id_pedido AND
        cliente_id = c_id_cliente
GROUP BY cliente_id, c_nombre, c_rif
ORDER BY "Total en pagos" DESC LIMIT 10;

/*Empleados disponibles*/

SELECT e_nombre "Nombre",e_segundo_nombre "Segundo Nombre", e_apellido "Apellido", e_segundo_apellido "Segundo Apellido"
FROM EMPLEADO
WHERE e_id_empleado NOT IN (SELECT empleado_id
                            FROM FASE_EMPL, FASE
                            WHERE fase_id = f_id_fase AND
                                ((f_fecha_inicio BETWEEN '1998-01-01' AND now()) OR
                                 (f_fecha_fin BETWEEN '1998-01-01' AND now())));


/*PRESENTACIÓN MÁS SOLICITADA DEL CLIENTE POR AÑO*/

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
        EXTRACT(YEAR FROM p_fecha_solicitud) = anio;


/*Tipo de pago preferido por los clientes*/

SELECT cliente_id "Codigo de cliente",
       c_nombre "Nombre", c_rif "RIF",(CASE
       WHEN COUNT(credito_id) = greatest(COUNT(credito_id), COUNT(debito_id), COUNT(transferencia_id), COUNT(cheque_id)) then 'Tarjeta de credito'
       WHEN COUNT(debito_id) = greatest(COUNT(credito_id), COUNT(debito_id), COUNT(transferencia_id), COUNT(cheque_id)) then 'Tarjeta de debito'
       WHEN COUNT(transferencia_id) = greatest(COUNT(credito_id), COUNT(debito_id), COUNT(transferencia_id), COUNT(cheque_id)) then 'Transferencia'
       WHEN COUNT(cheque_id) = greatest(COUNT(credito_id), COUNT(debito_id), COUNT(transferencia_id), COUNT(cheque_id)) then 'Cheque'
       END) "Tipo de pago preferido"
FROM PEDI_TIPO, PEDIDO, CLIENTE
WHERE pedido_id = p_id_pedido AND
      cliente_id = c_id_cliente AND
      p_fecha_pago BETWEEN '1998-01-01' and now()
GROUP BY cliente_id, c_nombre, c_rif;

/*Maquinaria mas utilizada en los proyectos por período de tiempo.*/

SELECT E.proyecto_id "Código del proyecto",
       p_nombre "Nombre del proyecto", MIN(m_nombre) "Maquinaria", cantidad "Cantidad", f_fecha_inicio "Inicio de uso",
       f_fecha_fin "Fin de uso"
FROM
    FASE F, FASE_CONFIGURACION FC, FASE_MAQU FM, ETAPA E, PROYECTO P, MAQUINARIA M,
    (SELECT MAX(cantidad) cantidad, proyecto_id
     FROM (SELECT proyecto_id, maquinaria_id, SUM(f_cantidad) cantidad
           FROM FASE F, FASE_CONFIGURACION FC, FASE_MAQU FM, ETAPA E, PROYECTO P
           WHERE F.fase_configuracion_id = FC.f_id_fase_configuracion AND
                   FM.fase_configuracion_id = FC.f_id_fase_configuracion AND
                   proyecto_id = P.p_id_proyecto AND
                   E.e_id_etapa = etapa_id
           GROUP BY proyecto_id, maquinaria_id) x
     GROUP BY proyecto_id) X
WHERE p_id_proyecto = E.proyecto_id AND
        etapa_id = e_id_etapa AND
        F.fase_configuracion_id = f_id_fase_configuracion AND
        FM.fase_configuracion_id = f_id_fase_configuracion AND
        maquinaria_id = M.m_id_maquinaria AND
        E.proyecto_id = X.proyecto_id AND
        FM.f_cantidad= cantidad AND
    (f_fecha_inicio BETWEEN '2018-04-01' AND '2018-05-01' OR
     f_fecha_fin BETWEEN '2018-04-01' AND '2018-05-01')
GROUP BY E.proyecto_id, p_nombre, cantidad, f_fecha_inicio, f_fecha_fin;