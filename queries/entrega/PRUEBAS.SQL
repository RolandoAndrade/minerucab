SELECT R.*,A.*
FROM ROL R, ROL_ACCI RA, ACCION A
WHERE R.r_id_rol=RA.rol_id AND RA.accion_id = A.a_id_accion