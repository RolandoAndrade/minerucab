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
                "lugar_id" : c.lugar_id
            }))
    }
}


export {cleanerMineral, cleanerCliente}