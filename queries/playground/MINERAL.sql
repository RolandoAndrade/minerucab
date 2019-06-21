CREATE TABLE MINERAL (
	m_id_mineral 	SERIAL,
	m_nombre	VARCHAR(30) NOT NULL,
	/* !!! OJO !!! REVISAR SUPERCLASE QUE LA PROF QUERIA PARA METALICOS */
	m_metalico	VARCHAR(5),
	m_radioactivo	VARCHAR(5),
	m_fecha_nacionalizacion	DATE,
	m_descripcion	VARCHAR(255),

	CONSTRAINT m_id_mineral PRIMARY KEY (m_id_mineral)
);

SELECT * FROM MINERAL;