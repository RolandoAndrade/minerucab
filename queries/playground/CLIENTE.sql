CREATE TABLE CLIENTE (
	c_id_cliente 	SERIAL,
	c_rif	        VARCHAR(30),
	c_nombre	    VARCHAR(50) NOT NULL,
	c_telefono	    VARCHAR(50) NOT NULL,
	lugar_id	    INTEGER NOT NULL,
    /* !!! OJO !!! REVISAR SI PONER FECHA DESDE QUE SON CLIENTES */

	CONSTRAINT c_id_cliente PRIMARY KEY (c_id_cliente)
);

SELECT * FROM CLIENTE;

INSERT INTO CLIENTE (c_id_cliente, c_rif, c_nombre, c_telefono, lugar_id)
    VALUES ( DEFAULT, 'J-1235467', 'Marilu', '04242131234', 1);

/* QUITAR NOT NULL CONSTRAINT DE UNA COLUMNA*/
ALTER TABLE CLIENTE
    ALTER COLUMN c_rif DROP NOT NULL;