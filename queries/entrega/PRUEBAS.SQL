select * from fase_carg;

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
SELECT cliente_id, (CASE
    WHEN COUNT(credito_id) = greatest(COUNT(credito_id), COUNT(debito_id), COUNT(transferencia_id), COUNT(cheque_id)) then 'Tarjeta de credito'
    WHEN COUNT(debito_id) = greatest(COUNT(credito_id), COUNT(debito_id), COUNT(transferencia_id), COUNT(cheque_id)) then 'Tarjeta de debito'
    WHEN COUNT(transferencia_id) = greatest(COUNT(credito_id), COUNT(debito_id), COUNT(transferencia_id), COUNT(cheque_id)) then 'Transferencia'
    WHEN COUNT(cheque_id) = greatest(COUNT(credito_id), COUNT(debito_id), COUNT(transferencia_id), COUNT(cheque_id)) then 'Cheque'
    END) "Tipo de pago preferido"
FROM PEDI_TIPO, PEDIDO
WHERE pedido_id = p_id_pedido
GROUP BY cliente_id


SELECT cliente_id, COUNT(credito_id),COUNT(debito_id),COUNT(transferencia_id),COUNT(cheque_id)
FROM PEDIDO, PEDI_TIPO
WHERE pedido_id = p_id_pedido
GROUP BY cliente_id

SELECT * FROM PEDIDO
SELECT * FROM pedi_prod

