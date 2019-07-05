select * from fase_carg


SELECT E.proyecto_id, E.salarios "Gastos en empleados", M.gastos "Gastos en equipo",
       viaticos "Viáticos", GA.monto "Gastos adicionales",
       coalesce(M.gastos,0)+coalesce(E.salarios+viaticos,0)+coalesce(GA.monto,0) "Total"
FROM
    (SELECT SUM(f_salario) salarios, SUM(f_viatico) viaticos, proyecto_id
     FROM fase_empl, etapa, fase
     where fase_id = f_id_fase AND
             etapa_id = e_id_etapa
     GROUP BY proyecto_id) E FULL JOIN
    (SELECT SUM(f_costo_alquiler) gastos, proyecto_id
     FROM fase_equi, fase, etapa
     WHERE fase_id = f_id_fase AND
             etapa_id = e_id_etapa
     GROUP BY proyecto_id) M ON E.proyecto_id = M.proyecto_id
    FULL JOIN (SELECT SUM(g_monto) monto, proyecto_id
               FROM gasto_adicional, fase, etapa
               WHERE fase_id = f_id_fase AND
                       etapa_id = e_id_etapa
               GROUP BY proyecto_id) GA ON (GA.proyecto_id = E.proyecto_id)




SELECT * FROM fase_empl


