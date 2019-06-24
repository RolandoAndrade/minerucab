const cleanerMineral = {
    limpiarLista( mineralesBD ) {
        if (mineralesBD === undefined || mineralesBD.length == 0)
            return []
        else 
            return mineralesBD.map( (m) => ({
                "m_id_mineral" : m.m_id_mineral.toString(10).padStart(4, '0'),
                "m_nombre" : m.m_nombre,
                "m_radioactivo" : m.m_radioactivo ? "Si" : "No" ,
                "m_tipo" : m.m_tipo === "metal" ? "Si" : "No" ,
                "m_fecha_nacionalizacion" : m.m_fecha_nacionalizacion ? m.m_fecha_nacionalizacion.split('T')[0] : "No",
                "m_descripcion" : m.m_descripcion
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
                "text": c.c_nombre
            }))
    }
}


export {
    cleanerMineral, 
    cleanerCliente, 
    cleanerEmpleado,
    cleanerLugar,
    cleanerCargo
}