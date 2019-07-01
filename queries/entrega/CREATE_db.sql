/* AQUI TODOS LOS CREATES DE LAS TABLAS EN ORDEN DE MODELO LOGICO */
/* NO PONER LAS RESTRICCIONES DE FOREIGN AQUI, VAN EN EL ARCHIVO RELACIONES.sql */

CREATE DATABASE MINER_UCAB;

CREATE TABLE ACCION (
    a_id_accion SERIAL,
    a_descripcion VARCHAR(255) NOT NULL,
    a_tipo VARCHAR(255) NOT NULL,
    a_tabla VARCHAR(255),

    CONSTRAINT check_a_tipo CHECK (a_tipo in ('c', 'r', 'u', 'd', 'rr')),
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

CREATE TABLE CLIENTE (
    c_id_cliente SERIAL,
    c_rif VARCHAR(255) UNIQUE,
    c_nombre VARCHAR(255) NOT NULL,
    c_telefono VARCHAR(255) NOT NULL,
    lugar_id INTEGER NOT NULL,

    CONSTRAINT c_id_cliente PRIMARY KEY (c_id_cliente)
);

CREATE TABLE COMPANIA (
    c_id_compania SERIAL,
    c_rif VARCHAR(255) UNIQUE,
    c_nombre VARCHAR(255) NOT NULL,
    c_nacionalizado BOOLEAN NOT NULL DEFAULT FALSE,
    c_fecha_nacional DATE,
    c_fecha_apertura DATE NOT NULL,
    c_capacidad_maxima_anual NUMERIC(10,2),
    lugar_id INTEGER NOT NULL,
    unidad_id INTEGER NOT NULL,

    CONSTRAINT check_c_capacidad_maxima_anual_positiva CHECK (c_capacidad_maxima_anual > 0),
    CONSTRAINT check_c_fecha_apertura CHECK (c_fecha_apertura <= now()),
    CONSTRAINT check_c_fecha_nacional CHECK ((c_fecha_nacional IS NULL) OR (c_fecha_nacional >= c_fecha_apertura) AND c_fecha_nacional <= now()),
    CONSTRAINT c_id_compania PRIMARY KEY (c_id_compania)
);

CREATE TABLE CREDITO (
    c_id_credito SERIAL,
    c_banco VARCHAR(255) NOT NULL,
    c_tipo VARCHAR(255) NOT NULL,
    c_numero_tarjeta VARCHAR(255) NOT NULL UNIQUE,
    c_fecha_vencimiento DATE NOT NULL,

    CONSTRAINT check_c_tipo CHECK (c_tipo IN ('mastercard', 'visa', 'american express') ),
    CONSTRAINT c_id_credito PRIMARY KEY (c_id_credito)
);

CREATE TABLE DEBITO (
    d_id_debito SERIAL,
    d_banco VARCHAR(255) NOT NULL,
    d_numero_tarjeta VARCHAR(255) NOT NULL UNIQUE,

    CONSTRAINT d_id_debito PRIMARY KEY (d_id_debito)
);

CREATE TABLE EMPLEADO (
    e_id_empleado SERIAL,
    e_cedula  VARCHAR(255) NOT NULL UNIQUE,
    e_genero VARCHAR(255) NOT NULL,
    e_nombre VARCHAR(255) NOT NULL,
    e_segundo_nombre VARCHAR(255),
    e_apellido VARCHAR(255) NOT NULL,
    e_segundo_apellido VARCHAR(255),
    e_telefono VARCHAR(255) NOT NULL,
    e_fecha_nacimiento DATE NOT NULL,
    e_fecha_ingreso DATE NOT NULL,
    cargo_id INTEGER NOT NULL,
    lugar_id INTEGER NOT NULL,
    estado_id INTEGER NOT NULL,
    
    CONSTRAINT check_e_genero CHECK (e_genero in ('m', 'f')),
    CONSTRAINT check_e_fecha_ingreso CHECK (e_fecha_ingreso <= now()),
    CONSTRAINT check_e_fecha_nacimiento CHECK (e_fecha_nacimiento + interval'18 years' <= e_fecha_ingreso),
    CONSTRAINT e_id_empleado PRIMARY KEY (e_id_empleado)
);

CREATE TABLE EQUIPO (
    e_id_equipo SERIAL,
    e_marca VARCHAR(255) NOT NULL,
    e_modelo VARCHAR(255) NOT NULL,
    e_serial VARCHAR(255) NOT NULL UNIQUE,
    maquinaria_id INTEGER NOT NULL,
    CONSTRAINT e_id_equipo PRIMARY KEY (e_id_equipo)
);

CREATE TABLE ESTADO (
    e_id_estado SERIAL,
    e_nombre VARCHAR(255) NOT NULL,
    CONSTRAINT e_id_estado PRIMARY KEY (e_id_estado)
);

CREATE TABLE ETAPA (
    e_id_etapa SERIAL,
    e_fecha_inicio DATE,
    estado_id INTEGER NOT NULL,
    proyecto_id INTEGER NOT NULL,
    etapa_configuracion_id INTEGER NOT NULL,

    CONSTRAINT chec_e_fecha_inicio CHECK (e_fecha_inicio <= now()),
    CONSTRAINT e_id_etapa PRIMARY KEY (e_id_etapa)
);

CREATE TABLE ETAPA_CONFIGURACION (
    e_id_etapa_configuracion SERIAL,
    e_nombre VARCHAR(255) NOT NULL,
    e_orden INTEGER NOT NULL,
    e_tipo VARCHAR(255) NOT NULL,
    yacimiento_configuracion_id INTEGER NOT NULL,

    CONSTRAINT check_e_tipo CHECK (e_tipo in ('explotacion', 'refinacion')),
    CONSTRAINT check_e_orden CHECK (e_orden > 0),
    CONSTRAINT e_id_etapa_configuracion PRIMARY KEY (e_id_etapa_configuracion)
);

CREATE TABLE FASE (
    f_id_fase SERIAL,
    f_fecha_inicio DATE,
    f_fecha_fin DATE,
    etapa_id INTEGER NOT NULL,
    fase_configuracion_id INTEGER NOT NULL,
    estado_id INTEGER NOT NULL,

    CONSTRAINT check_f_fecha_fin CHECK ((f_fecha_fin IS NULL) OR (f_fecha_fin > f_fecha_inicio)),
    CONSTRAINT f_id_fase PRIMARY KEY (f_id_fase)
);

CREATE TABLE FASE_CARG (
    f_id_fase_cargo SERIAL,
    f_cantidad INTEGER NOT NULL,
    fase_configuracion_id INTEGER NOT NULL,
    cargo_id INTEGER NOT NULL,

    CONSTRAINT check_f_cantidad CHECK (f_cantidad > 0),
    CONSTRAINT f_id_fase_cargo PRIMARY KEY (f_id_fase_cargo)
);

CREATE TABLE FASE_CONFIGURACION (
    f_id_fase_configuracion SERIAL,
    f_nombre VARCHAR(255) NOT NULL,
    f_orden INTEGER NOT NULL,
    f_duracion INTEGER NOT NULL,
    f_descripcion VARCHAR(255),
    etapa_configuracion_id INTEGER NOT NULL,
    unidad_id INTEGER NOT NULL,


    CONSTRAINT check_f_orden CHECK (f_orden > 0),
    CONSTRAINT check_f_duracion CHECK (f_duracion > 0),
    CONSTRAINT f_id_fase_configuracion PRIMARY KEY (f_id_fase_configuracion)
);

CREATE TABLE FASE_EMPL (
    f_id_fase_empl SERIAL,
    f_viatico NUMERIC(10,2) DEFAULT 0,
    f_salario NUMERIC(10,2) NOT NULL,
    empleado_id INTEGER NOT NULL,
    fase_id INTEGER NOT NULL,
    horario_id INTEGER NOT NULL,
    unidad_id INTEGER ,

    CONSTRAINT check_f_salario CHECK (f_salario >= 0),
    CONSTRAINT check_f_viatico CHECK (f_viatico >= 0),
    CONSTRAINT f_id_fase_empl PRIMARY KEY (f_id_fase_empl)
);

CREATE TABLE FASE_EQUI (
    f_id_fase_equi SERIAL,
    f_costo_alquiler NUMERIC(10,2) NOT NULL,
    unidad_id INTEGER NOT NULL,
    equipo_id INTEGER NOT NULL,
    fase_id INTEGER NOT NULL,

    CONSTRAINT check_f_costo_alquiler CHECK (f_costo_alquiler >= 0),
    CONSTRAINT f_id_fase_equi PRIMARY KEY (f_id_fase_equi)
);

CREATE TABLE FASE_MAQU (
    f_id_fase_maqu SERIAL,
    f_cantidad INTEGER NOT NULL,
    fase_configuracion_id INTEGER NOT NULL,
    maquinaria_id INTEGER NOT NULL,
         
    CONSTRAINT check_f_cantidad CHECK (f_cantidad > 0),
    CONSTRAINT f_id_fase_maqu PRIMARY KEY (f_id_fase_maqu)
);

CREATE TABLE GASTO_ADICIONAL (
    g_id_gasto_adicional SERIAL,
    g_monto NUMERIC(10,2) NOT NULL,
    g_concepto VARCHAR(255) NOT NULL,
    unidad_id INTEGER NOT NULL,
    fase_id INTEGER NOT NULL,

    CONSTRAINT g_id_gasto_adicional PRIMARY KEY (g_id_gasto_adicional)
);

CREATE TABLE HORARIO (
    h_id_horario SERIAL,
    h_nombre VARCHAR(255)  NOT NULL,

    CONSTRAINT h_id_horario PRIMARY KEY (h_id_horario)
);

CREATE TABLE INVENTARIO (
    i_id_inventario SERIAL,
    i_cantidad NUMERIC(10,2) NOT NULL,
    i_ingresado BOOLEAN NOT NULL DEFAULT FALSE,
    i_fecha_modificacion DATE NOT NULL,
    mineral_id INTEGER NOT NULL,
    unidad_id INTEGER NOT NULL,
    proyecto_id INTEGER,
    solicitud_id INTEGER,
    pedido_id INTEGER,

    CONSTRAINT check_i_cantidad CHECK (i_cantidad > 0),
    CONSTRAINT check_i_fecha_modificacion CHECK (i_fecha_modificacion <= now()),
    CONSTRAINT i_id_inventario PRIMARY KEY (i_id_inventario)
);

CREATE TABLE JORNADA (
    j_id_jornada SERIAL,
    j_dia VARCHAR(255) NOT NULL,
    j_hora_entrada INTEGER NOT NULL,
    j_hora_salida INTEGER NOT NULL,
    horario_id INTEGER NOT NULL,


    CONSTRAINT check_j_hora_salida CHECK (j_hora_salida > j_hora_entrada AND j_hora_salida < 24),
    CONSTRAINT check_j_hora_entrada CHECK (j_hora_entrada >= 0 AND j_hora_entrada < 24),
    CONSTRAINT check_j_dia CHECK (j_dia IN ('l', 'm', 'x', 'j', 'v', 's', 'd')),
    CONSTRAINT j_id_jornada PRIMARY KEY (j_id_jornada)
);

CREATE TABLE LUGAR (
    l_id_lugar SERIAL,
    l_nombre VARCHAR(255) NOT NULL,
    l_tipo VARCHAR NOT NULL,
    lugar_id INTEGER,

    CONSTRAINT check_l_tipo CHECK (l_tipo IN ('pais','estado','municipio','parroquia')),
    CONSTRAINT l_id_lugar PRIMARY KEY (l_id_lugar)
);

CREATE TABLE MAQUINARIA (
    m_id_maquinaria SERIAL,
    m_nombre VARCHAR(255) NOT NULL,
    m_descripcion VARCHAR(255),

    CONSTRAINT m_id_maquinaria PRIMARY KEY (m_id_maquinaria)
);

CREATE TABLE MINE_MINE (
    m_id_mine_mine SERIAL,
    mineral_id_compone INTEGER NOT NULL,
    mineral_id_compuesto INTEGER NOT NULL,

    CONSTRAINT check_compone_compuesto CHECK (mineral_id_compuesto != mineral_id_compone),
    CONSTRAINT m_id_mine_mine PRIMARY KEY (m_id_mine_mine)
);

CREATE TABLE MINE_YACI (
    m_id_mine_yaci SERIAL,
    m_cantidad NUMERIC(10,2) NOT NULL,
    yacimiento_configuracion_id INTEGER NOT NULL,
    mineral_id INTEGER NOT NULL,
    unidad_id INTEGER NOT NULL,

    CONSTRAINT check_m_cantidad CHECK (m_cantidad > 0),
    CONSTRAINT m_id_mine_yaci PRIMARY KEY (m_id_mine_yaci)
);

CREATE TABLE MINERAL (
    m_id_mineral SERIAL,
    m_nombre VARCHAR(255) NOT NULL UNIQUE,
    m_radioactivo BOOLEAN NOT NULL DEFAULT FALSE,
    m_fecha_nacionalizacion DATE,
    m_descripcion VARCHAR(255),
    m_dureza INTEGER,
    m_maleabilidad INTEGER,
    m_viscosidad INTEGER,
    m_tipo VARCHAR(500) NOT NULL,

    CONSTRAINT check_m_tipo CHECK (m_tipo in ('metal', 'no metal')),
    CONSTRAINT check_m_fecha_nacionalizacion CHECK (m_fecha_nacionalizacion <= now()),
    CONSTRAINT m_id_mineral PRIMARY KEY (m_id_mineral)
);

CREATE TABLE PEDI_ESTA (
    p_id_pedi_esta SERIAL,
    p_fecha_modificacion DATE NOT NULL,
    estado_id INTEGER NOT NULL,
    pedido_id INTEGER NOT NULL,

    CONSTRAINT check_p_fecha_modificacion CHECK (p_fecha_modificacion <= now()),
    CONSTRAINT p_id_pedi_esta PRIMARY KEY (p_id_pedi_esta)
);

CREATE TABLE PEDI_PROD (
    p_id_pedi_prod SERIAL,
    p_cantidad INTEGER NOT NULL,
    p_precio_unitario NUMERIC(10,2) NOT NULL,
    unidad_id INTEGER NOT NULL,
    producto_id INTEGER NOT NULL,
    pedido_id INTEGER NOT NULL,

    CONSTRAINT check_p_precio_unitario CHECK (p_precio_unitario > 0),
    CONSTRAINT check_p_cantidad CHECK (p_cantidad > 0),
    CONSTRAINT p_id_pedi_prod PRIMARY KEY (p_id_pedi_prod)
);

CREATE TABLE PEDI_TIPO (
    p_id_pedi_tipo SERIAL,
    p_monto NUMERIC(10,2) NOT NULL,
    p_fecha_pago DATE NOT NULL,
    credito_id INTEGER,
    debito_id INTEGER,
    transferencia_id INTEGER,
    cheque_id INTEGER,
    pedido_id INTEGER NOT NULL,
    unidad_id INTEGER NOT NULL,

    CONSTRAINT check_p_monto CHECK (p_monto > 0),
    CONSTRAINT check_p_fecha_pago CHECK (p_fecha_pago <= now()),
    CONSTRAINT p_id_pedi_tipo PRIMARY KEY (p_id_pedi_tipo)
);

CREATE TABLE PEDIDO (
    p_id_pedido SERIAL,
    p_fecha_solicitud DATE NOT NULL,
    cliente_id INTEGER NOT NULL,

    CONSTRAINT check_p_fecha_solicitud CHECK (p_fecha_solicitud <= now()),
    CONSTRAINT p_id_pedido PRIMARY KEY (p_id_pedido)
);

CREATE TABLE PROD_COMP (
    p_id_prod_comp SERIAL,
    p_precio_estimado NUMERIC(10,2) NOT NULL,
    compania_id INTEGER NOT NULL,
    producto_id INTEGER NOT NULL,
    unidad_id INTEGER NOT NULL,

    CONSTRAINT check_p_precio_estimado CHECK (p_precio_estimado > 0),
    CONSTRAINT p_id_prod_comp PRIMARY KEY (p_id_prod_comp)
);

CREATE TABLE PROD_SOLI (
    p_id_prod_soli SERIAL,
    p_cantidad INTEGER NOT NULL,
    p_precio_compra NUMERIC NOT NULL,
    solicitud_id INTEGER NOT NULL,
    prod_comp_id INTEGER NOT NULL,
    unidad_id INTEGER NOT NULL,

    CONSTRAINT check_p_precio_compra CHECK (p_precio_compra > 0),
    CONSTRAINT check_p_cantidad CHECK (p_cantidad > 0),
    CONSTRAINT p_id_prod_soli PRIMARY KEY (p_id_prod_soli)
);

CREATE TABLE PRODUCTO (
    p_id_producto SERIAL,
    p_nombre VARCHAR(255) NOT NULL,
    p_porcentaje_pureza NUMERIC(10,2) NOT NULL,
    p_peso NUMERIC(10,2) NOT NULL,
    p_fabricado BOOLEAN NOT NULL DEFAULT FALSE,
    unidad_id INTEGER NOT NULL,
    mineral_id INTEGER NOT NULL,

    CONSTRAINT check_p_peso CHECK (p_peso > 0),
    CONSTRAINT check_p_porcentaje_pureza CHECK ((p_porcentaje_pureza >= 0) AND (p_porcentaje_pureza <= 100)),
    CONSTRAINT p_id_producto PRIMARY KEY (p_id_producto)
);

CREATE TABLE PROYECTO (
    p_id_proyecto SERIAL,
    p_nombre VARCHAR(255) NOT NULL,
    p_fecha_inicio DATE NOT NULL,
    estado_id INTEGER NOT NULL,
    yacimiento_id INTEGER NOT NULL,
    pedido_id INTEGER,

    CONSTRAINT p_id_proyecto PRIMARY KEY (p_id_proyecto)
);

CREATE TABLE ROL (
    r_id_rol SERIAL,
    r_nombre VARCHAR(255) NOT NULL UNIQUE,

    CONSTRAINT r_id_rol PRIMARY KEY (r_id_rol)
);

CREATE TABLE ROL_ACCI (
    r_id_rol_acci SERIAL,
    rol_id INTEGER NOT NULL,
    accion_id INTEGER NOT NULL,

    CONSTRAINT r_id_rol_acci PRIMARY KEY (r_id_rol_acci)
);

CREATE TABLE SECT_MINE (
    s_id_sect_mine SERIAL,
    mineral_id INTEGER NOT NULL,
    sector_uso_id INTEGER NOT NULL,

    CONSTRAINT s_id_sect_mine PRIMARY KEY (s_id_sect_mine)
);

CREATE TABLE SECTOR_USO (
    s_id_sector_uso SERIAL,
    s_nombre VARCHAR(255) NOT NULL UNIQUE,
    s_descripcion VARCHAR(255),

    CONSTRAINT s_id_sector_uso PRIMARY KEY (s_id_sector_uso)
);

CREATE TABLE SOLICITUD(
    s_id_solicitud SERIAL,
    s_fecha_solicitud DATE NOT NULL,
    s_fecha_pago DATE,
    proyecto_id INTEGER NOT NULL,
    estado_id INTEGER NOT NULL,

    CONSTRAINT check_s_fecha_solicitud CHECK (s_fecha_solicitud <= now()),
    CONSTRAINT check_s_fecha_pago CHECK (s_fecha_pago IS NULL OR  s_fecha_pago>= s_fecha_pago AND s_fecha_pago<= now()),
    CONSTRAINT s_id_solicitud PRIMARY KEY (s_id_solicitud)
);

CREATE TABLE TIPO_YACIMIENTO (
    t_id_tipo_yacimiento SERIAL,
    t_nombre VARCHAR(255) NOT NULL UNIQUE,

    CONSTRAINT t_id_tipo_yacimiento PRIMARY KEY (t_id_tipo_yacimiento)
);

CREATE TABLE TRANSFERENCIA (
    t_id_transferencia SERIAL,
    t_banco VARCHAR(255) NOT NULL,
    t_numero_transferencia VARCHAR(255) NOT NULL UNIQUE,

    CONSTRAINT t_id_transferencia PRIMARY KEY (t_id_transferencia)
);

CREATE TABLE UNIDAD (
    u_id_unidad SERIAL,
    u_nombre VARCHAR(255) NOT NULL UNIQUE,
    u_tipo VARCHAR(255) NOT NULL,
    u_abreviatura VARCHAR(255) NOT NULL UNIQUE,

    CONSTRAINT check_u_tipo CHECK (u_tipo in ('temporal', 'masa', 'area', 'monetaria')),
    CONSTRAINT u_id_unidad PRIMARY KEY (u_id_unidad)
);

CREATE TABLE USUARIO (
    u_id_usuario SERIAL,
    u_correo VARCHAR(255) NOT NULL UNIQUE,
    u_clave VARCHAR(255) NOT NULL,
    empleado_id INTEGER NOT NULL,
    rol_id INTEGER NOT NULL,

    CONSTRAINT u_id_usuario PRIMARY KEY (u_id_usuario)
);

CREATE TABLE YACIMIENTO (
    y_id_yacimiento SERIAL,
    y_nombre VARCHAR(255) NOT NULL,
    y_extension NUMERIC(10,2) NOT NULL,
    yacimiento_configuracion_id INTEGER NOT NULL,
    tipo_yacimiento_id INTEGER,
    lugar_id INTEGER NOT NULL,
    unidad_id INTEGER NOT NULL,
    
    CONSTRAINT check_y_extension CHECK (y_extension > 0), 
    CONSTRAINT y_id_yacimiento PRIMARY KEY (y_id_yacimiento)
);

CREATE TABLE YACIMIENTO_CONFIGURACION (
    y_id_yacimiento_configuracion SERIAL,
    y_nombre VARCHAR(255) NOT NULL,
    y_capacidad_explotacion NUMERIC(10,2) NOT NULL,
    mineral_id INTEGER NOT NULL,
    unidad_id INTEGER NOT NULL,
    
    CONSTRAINT check_y_capacidad_explotacion CHECK (y_capacidad_explotacion > 0),
    CONSTRAINT y_id_yacimiento_configuracion PRIMARY KEY (y_id_yacimiento_configuracion)
);