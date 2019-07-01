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
                if (!(e.e_tipo === "explotacion" || e.e_tipo === "refinacion")) flag = "tipo de etapa invalido"
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
                        else if (f.cargos.length === 0) flag = "fase sin cargos"
                        else {
                            f.cargos.forEach((c) => {
                                if (c.c_id_cargo === 0 ) flag = "cargo invalido"
                                if (!c.f_cantidad || c.f_cantidad <=0) flag = "cantidad de cargos invalida"
                            })
                        }

                        if (f.maquinarias && f.maquinarias > 0 )
                            f.maquinarias.forEach((m) => {
                                if (m.f_cantidad === 0) flag = "maquinaria invalida"
                                if (!m.f_cantidad || m.f_cantidad <=0) flag = "cantidad de maquinarias invalida"
                            })
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