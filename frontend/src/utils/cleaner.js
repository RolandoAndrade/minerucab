const cleanerMineral = {
    limpiarLista( mineralesBD ) {
        if (mineralesBD === undefined || mineralesBD.length == 0)
            return []
        else 
            return mineralesBD.map( (m) => ({
                "m_id_mineral" : m.m_id_mineral.toString(10).padStart(4, '0'),
                "m_nombre" : m.m_nombre,
                "m_radioactivo" : m.m_radioactivo ? "Si" : "No" ,
                "m_metalico" : m.m_metalico ? "Si" : "No" ,
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
                "cargo_id" : e.cargo_id, 
                "lugar_id" : e.lugar_id, 
                "estado_id" : e.estado_id,
                "cargo" : e.cargo, 
                "lugar" : e.lugar, 
                "estado" : e.estado
            }))
    }
}


export {
    cleanerMineral, 
    cleanerCliente, 
    cleanerEmpleado
}