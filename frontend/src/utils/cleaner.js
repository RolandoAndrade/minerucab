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
                "m_id_mineral" : c.m_id_mineral.toString(10).padStart(4, '0'),
                "m_nombre" : c.m_nombre,
                "m_radioactivo" : c.m_radioactivo ? "Si" : "No" ,
                "m_metalico" : c.m_metalico ? "Si" : "No" ,
                "m_fecha_nacionalizacion" : c.m_fecha_nacionalizacion ? c.m_fecha_nacionalizacion.split('T')[0] : "No",
                "m_descripcion" : c.m_descripcion
            }))
    }
}


export {cleanerMineral, cleanerCliente}