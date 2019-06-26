select distinct e_tipo from etapa_configuracion;
﻿/* PADRES DE UN MINERAL X
	X hijo de A
	X hijo de B
	quiero A y B
*/
SELECT M.m_nombre, M.m_id_mineral
FROM MINERAL M, MINE_MINE MM
WHERE	M.m_id_mineral = MM.mineral_id_compuesto AND
		MM.mineral_id_compone = 19;

/* TODOS LOS HIJOS DE UN MINERAL W
	W padre de A
	W padre de B
	quiero A y B
*/
SELECT M.m_nombre, M.m_id_mineral
FROM MINERAL M, MINE_MINE MM
WHERE	M.m_id_mineral = MM.mineral_id_compone AND
		MM.mineral_id_compuesto = 12;

/* TODOS LOS MINERALES MENOS UNO ESPECIFICO Y SUS PADRES */
SELECT M.m_nombre, M.m_id_mineral
FROM MINERAL M
WHERE M.m_id_mineral != 19 AND
	M.m_id_mineral NOT IN( 
		SELECT M.m_id_mineral
		FROM MINERAL M, MINE_MINE MM
		WHERE	M.m_id_mineral = MM.mineral_id_compuesto AND
				MM.mineral_id_compone = 19
	);

SELECT * FROM UNIDAD;
