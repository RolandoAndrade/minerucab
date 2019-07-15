SELECT * FROM fase_equi
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

select * from fase_configuracion where f_id_fase_configuracion=7;
SELECT * FROM fase_maqu;
