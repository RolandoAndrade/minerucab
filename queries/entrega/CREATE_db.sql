/* */
CREATE DATABASE MINERUCAB;

CREATE TABLE ACCION (
    a_id_accion SERIAL,
    a_descripcion VARCHAR(255) NOT NULL,
    a_tipo VARCHAR(255) NOT NULL,
    a_tabla VARCHAR(255),

    CONSTRAINT check_a_tipo CHECK (a_tipo in ('C', 'R', 'U', 'D', 'RR')),
    CONSTRAINT a_id_accion PRIMARY KEY (a_id_accion)
);

CREATE TABLE CARA_TIPO (
    c_id_cara_tipo SERIAL,
    caracteritica_id INTEGER NOT NULL,
    tipo_yacimiento_id INTEGER NOT NULL,

    CONSTRAINT c_id_cara_tipo PRIMARY KEY (c_id_cara_tipo)
);

CREATE TABLE CARACTERISTICA (
    c_id_caracteristica SERIAL,
    c_nombre VARCHAR(255) NOT NULL,
    c_descripcion VARCHAR(255) NOT NULL,

    CONSTRAINT c_id_caracteristica PRIMARY KEY (c_id_caracteristica)
);

CREATE TABLE CARGO (
    c_id_cargo SERIAL,
    c_nombre VARCHAR(255) NOT NULL UNIQUE,
    c_tipo_labor VARCHAR(255) NOT NULL,
    c_profesional BOOLEAN NOT NULL DEFAULT FALSE,
    c_descripcion VARCHAR(255) NOT NULL,
    
    CONSTRAINT c_id_cargo PRIMARY KEY (c_id_cargo)
);

CREATE TABLE CHEQUE (
    c_id_cheque SERIAL,
    c_banco VARCHAR(255) NOT NULL,
    c_numero_cuenta VARCHAR(255) NOT NULL,
    c_numero_cheque VARCHAR(255) NOT NULL UNIQUE,

    CONSTRAINT c_id_cheque PRIMARY KEY (c_id_cheque)
);

CREATE TABLE (
    CONSTRAINT c_id_cargo PRIMARY KEY (c_id_cargo)
);

CREATE TABLE (
    CONSTRAINT c_id_cargo PRIMARY KEY (c_id_cargo)
);

CREATE TABLE (
    CONSTRAINT c_id_cargo PRIMARY KEY (c_id_cargo)
);