SELECT E.e_nombre "Nombre del empleado", E.e_apellido, EXTRACT(MONTH FROM f_fecha_inicio) mes, EXTRACT(YEAR FROM f_fecha_inicio) año,
       COUNT(*) "Total de participaciones", p_nombre "Nombre del proyecto"
FROM EMPLEADO E, FASE_EMPL FE, FASE F, ETAPA ET, PROYECTO P
WHERE E.e_id_empleado = FE.empleado_id AND
      FE.fase_id = f_id_fase AND
      etapa_id = e_id_etapa AND
      proyecto_id = p_id_proyecto AND
      (f_fecha_inicio BETWEEN '1998-10-10' AND NOW() OR
       f_fecha_fin BETWEEN '1998-10-10' AND NOW())
GROUP BY E.e_id_empleado, E.e_nombre, mes, año, proyecto_id, p_nombre
HAVING COUNT(*)>1
ORDER BY año, mes, E.e_id_empleado
/*FECHA_INICIO = '10-10-2018'
  FECHA_FIN = '10-10-2019
 */