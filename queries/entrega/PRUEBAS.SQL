SELECT empleado_id, count(proyecto_id)
FROM fase_empl, etapa, fase
WHERE fase_id = f_id_fase AND
        etapa_id = e_id_etapa
GROUP BY empleado_id

SELECT e_nombre "Nombre",e_segundo_nombre "Segundo Nombre", e_apellido "Apellido", e_segundo_apellido "Segundo Apellido"
FROM EMPLEADO
WHERE e_id_empleado NOT IN (SELECT empleado_id
                            FROM FASE_EMPL, FASE
                            WHERE fase_id = f_id_fase AND
                            ((f_fecha_inicio BETWEEN '1998-01-01' AND now()) OR
                            (f_fecha_fin BETWEEN '1998-01-01' AND now())))