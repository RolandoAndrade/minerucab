const cleanerMineral = {
    limpiarLista( mineralesBD ) {
        if (mineralesBD === undefined || mineralesBD.length == 0)
            return []
        else 
            return mineralesBD.map( (m) => ({
                "m_id_mineral" : m.m_id_mineral && m.m_id_mineral.toString(10).padStart(4, '0'),
                "m_nombre" : m.m_nombre,
                "m_radioactivo" : m.m_radioactivo ? "Si" : "No" ,
                "m_tipo" : m.m_tipo === "metal" ? "Si" : "No" ,
                "m_fecha_nacionalizacion" : m.m_fecha_nacionalizacion ? m.m_fecha_nacionalizacion.split('T')[0] : "No",
                "m_descripcion" : m.m_descripcion
            }))
    },
    limpiarListaDropdown(mineralesDB)
    {
        if (mineralesDB === undefined || mineralesDB.length == 0)
            return []
        else
            return mineralesDB.map( m => ({
                "id" : m.m_id_mineral,
                "text": m.m_nombre,
                "value" : m.m_id_mineral,
                "label" : m.m_nombre
            }))
    }
}

const cleanerCliente = {
    limpiarLista( clientesBD ) {
        if (clientesBD === undefined || clientesBD.length == 0)
            return []
        else 
            return clientesBD.map( (c) => ({
                "c_id_cliente" : c.c_id_cliente.toString(10).padStart(4, '0'),
                "c_nombre" : c.c_nombre,
                "c_rif" : c.c_rif || "No posee" ,
                "c_telefono" : c.c_telefono || "No posee",
                "lugar_id" : c.lugar_id,
                "lugar" : c.lugar
            }))
    },
    limpiarListaDropdown(clientesBD)
    {
        if (clientesBD === undefined || clientesBD.length == 0)
            return []
        else
            return clientesBD.map( m => ({
                "id" : m.c_id_cliente,
                "text": m.c_nombre
            }))
    }
}

const cleanerEmpleado = {
    limpiarLista( empleadosDB ) {
        if (empleadosDB === undefined || empleadosDB.length == 0)
            return []
        else 
            return empleadosDB.map( (e) => ({
                "e_id_empleado" : e.e_id_empleado.toString(10).padStart(4, '0'),
                "e_cedula" : e.e_cedula, 
                "e_nombre" : e.e_nombre, 
                "e_segundo_nombre" : e.e_segundo_nombre, 
                "e_apellido" : e.e_apellido, 
                "e_segundo_apellido" : e.e_segundo_apellido, 
                "e_telefono" : e.e_telefono, 
                "e_fecha_nacimiento" : e.e_fecha_nacimiento ? e.e_fecha_nacimiento.split('T')[0] : "No",
                "e_fecha_ingreso" : e.e_fecha_ingreso ? e.e_fecha_ingreso.split('T')[0] : "No",
                "e_genero" : e.e_genero === "m" ? "Hombre" : "Mujer",
                "cargo_id" : e.cargo_id, 
                "lugar_id" : e.lugar_id, 
                "estado_id" : e.estado_id,
                "cargo" : e.cargo, 
                "lugar" : e.lugar, 
                "estado" : e.estado
            }))
    }
}

const cleanerLugar = {
    limpiarListaDropdown( lugaresDB ) {
        if (lugaresDB === undefined || lugaresDB.length == 0)
            return []
        else 
            return lugaresDB.map( l => ({
                "id" : l.l_id_lugar,
                "text": l.l_nombre,
                "l_tipo" : l.l_tipo,
                "lugar_id" : l.lugar_id 
            }))
    }
}

const cleanerCargo = {
    limpiarListaDropdown( cargosBD ) {
        if (cargosBD === undefined || cargosBD.length == 0)
            return []
        else 
            return cargosBD.map( c => ({
                ...c,
                "id" : c.c_id_cargo,
                "text": c.c_nombre,
                "value": c.c_id_cargo,
                "label": c.c_nombre
            }))
    }
}

const cleanerYacimiento = {
    limpiarLista(  yacimientosDB ) {
        if ( yacimientosDB === undefined ||  yacimientosDB.length == 0)
            return []
        else 
            return  yacimientosDB.map( y => ({
                ...y,
                "y_id_yacimiento" : y.y_id_yacimiento.toString(10).padStart(4, '0')
            }))
    }
}

const cleanerPedido = {
    limpiarLista(  pedidoDB ) {
        if ( pedidoDB === undefined ||  pedidoDB.length == 0)
            return []
        else
            return  pedidoDB.map( y => ({
                "p_id_pedido" : y.p_id_pedido.toString(10).padStart(4, '0'),
                "p_fecha_solicitud": y.p_fecha_solicitud.substring(0,10),
                "c_nombre": y.c_nombre,
                "e_nombre": y.e_nombre
            }))
    }
}


const cleanerConfiguracion = {
    limpiarListaDropdown(  configuracioneDB ) {
        if ( configuracioneDB === undefined ||  configuracioneDB.length == 0)
            return []
        else 
            return  configuracioneDB.map( cy => ({
                ...cy,
                "text" : cy.y_nombre,
                "id" : cy.y_id_yacimiento_configuracion
            }))
    }
}

const cleanerTipoYacimiento = {
    limpiarListaDropdown(  tipoYacimientosDB ) {
        if ( tipoYacimientosDB === undefined ||  tipoYacimientosDB.length == 0)
            return []
        else 
            return  tipoYacimientosDB.map( ty => ({
                ...ty,
                "text" : ty.t_nombre,
                "id" : ty.t_id_tipo_yacimiento
            }))
    }
}

const cleanerProyecto = {
    limpiarLista( proyectosBD ) {
        if (proyectosBD === undefined || proyectosBD.length == 0)
            return []
        else 
            return proyectosBD.map( (p) => ({
                ...p,
                "p_id_proyecto" : p.p_id_proyecto.toString(10).padStart(4, '0'),
                "pedido_id": p.pedido_id.toString(10).padStart(4, '0'),
                "p_fecha_inicio" : p.p_fecha_inicio ? p.p_fecha_inicio.split('T')[0] : "Sin fecha"
            }))
    },
    limpiarListaDropdown(  proyectosBD ) {
        if ( proyectosBD === undefined ||  proyectosBD.length == 0)
            return []
        else 
            return  proyectosBD.map( p => ({
                ...p,
                "text" : p.p_nombre,
                "id" : p.p_id_proyecto
            }))
    }
}

const cleanerProducto = {
    limpiarListaDropdown(  productoDB ) {
        if ( productoDB === undefined ||  productoDB.length == 0)
            return []
        else
            return  productoDB.map( p => ({
                "text" : p.p_nombre,
                "id" : p.p_id_producto,
                "mineral": p.mineral_id
            }))
    }
}


export {
    cleanerMineral, 
    cleanerCliente, 
    cleanerEmpleado,
    cleanerLugar,
    cleanerCargo,
    cleanerYacimiento,
    cleanerConfiguracion,
    cleanerTipoYacimiento,
    cleanerProyecto,
    cleanerProducto,
    cleanerPedido
}