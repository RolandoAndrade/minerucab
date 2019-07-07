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

SELECT p_nombre "Nombre del proyecto",
       e_nombre "Etapa atrasada",
       e_orden "Número de etapa",
       f_id_fase "Código de la fase",
       f_nombre "Nombre de la fase",
       f_orden "Número de fase",
       f_fecha_inicio "Fecha de inicio pautada",
       f_fecha_fin "Fecha de fin pautada"
FROM FASE, FASE_CONFIGURACION, ETAPA, ETAPA_CONFIGURACION, PROYECTO
WHERE fase_configuracion_id = f_id_fase_configuracion AND
        etapa_id = e_id_etapa AND
        proyecto_id = p_id_proyecto AND
        etapa.etapa_configuracion_id = e_id_etapa_configuracion AND
        f_fecha_fin<now() AND
        fase.estado_id != 2;

/*Empleados disponibles*/

SELECT E.e_id_empleado "Codigo del empleado", E.e_cedula "Cedula del empleado", E.e_nombre "Nombre",
       E.e_segundo_nombre "Segundo nombre", e_apellido "Apellido", E.e_segundo_apellido "Segundo apellido",
       E.e_genero "Genero", E.e_telefono "Telefono", E.e_fecha_nacimiento "Fecha de nacimiento",
       E.e_fecha_ingreso "Fecha de ingreso", C.c_nombre "Cargo", ES.l_nombre "Estado" ,
       M.l_nombre "Municipio",P.l_nombre "Parroquia"
FROM EMPLEADO E, CARGO C, LUGAR P, LUGAR M, LUGAR ES
WHERE E.estado_id = 11 AND
      C.c_id_cargo = E.cargo_id AND
      E.lugar_id = P.l_id_lugar AND
      P.lugar_id = M.l_id_lugar AND
      M.lugar_id = ES.l_id_lugar;


