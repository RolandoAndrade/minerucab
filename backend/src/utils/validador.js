const validadorYacimientoConfiguracion = {
    validar (y)  {
        let flag = ""
        if (!y) flag = "Configuracion vacia"
        if (y.y_capacidad_explotacion <= 0 ) flag = "y_capacidad_explotacion < 0"

        if (y.requisitos && y.requisitos.length > 0)
            y.requisitos.forEach((r) => {
                if (r.m_cantidad <= 0) flag = "cantidad de requisito negativa"
            })
                        
        if (!y.etapas) flag = "configuracion sin etapas"
        else if (y.etapas.length === 0) flag = "configuracion sin etapas"
        else{
            for(let i = 0; i < y.etapas.length; i++){
                let e = y.etapas.find((et) => et.e_orden === i+1)
                if (!e) flag = `etapa de orden ${i+1} no presente`
            }
    
            y.etapas.forEach((e) => {
                if (!e.fases) flag = "etapa sin fases"
                else if (e.fases.length === 0) flag = "etapa sin fases"
                else {
                    for(let i = 0; i < e.fases.length; i++){
                        let f = e.fases.find((fa) => fa.f_orden === i+1)
                        if (!f) flag = `etapa de orden ${i+1} no presente`
                    }
        
                    e.fases.forEach((f) => {
                        if (f.f_duracion <= 0 ) flag = "fase de duracion negativa"
                        if (!f.cargos) flag = "fase sin cargos"
                        if (f.cargos.length === 0) flag = "fase sin cargos"
                    })
                }                
            })
        }
        return flag
    }
}

export {
    validadorYacimientoConfiguracion
}