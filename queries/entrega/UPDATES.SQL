UPDATE PROYECTO
SET estado_id = 10
WHERE p_id_proyecto in (SELECT proyecto_id from ETAPA where estado_id=2 GROUP BY proyecto_id HAVING COUNT(*)=2);

UPDATE EMPLEADO
SET estado_id = 11
WHERE estado_id=12 AND 2 = ALL(SELECT fase.estado_id from FASE_EMPL, FASE
              WHERE fase_id = f_id_fase AND
                      e_id_empleado = empleado_id)

