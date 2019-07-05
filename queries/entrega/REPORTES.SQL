SELECT c_id_compania "Código de la empresa", c_rif "RIF", c_nombre "Nombre de la empresa",
       c_nacionalizado "¿Está nacionalizada?", c_fecha_nacional "Fecha de nacionalización",
       c_fecha_apertura "Fecha de inaguración", c_capacidad_maxima_anual "Producción anual",
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