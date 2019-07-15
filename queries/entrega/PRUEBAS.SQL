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

/*FECHA_INICIO = '10-10-2018'
  FECHA_FIN = '10-10-2019
 */