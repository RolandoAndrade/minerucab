const validadorYacimientoConfiguracion = {
    validar (y)  {
        let flag = ""
        if (!y) flag = "Configuracion vacia"
        if (!y.y_nombre || y.y_nombre === "") flag = "nombre de configuracion de yacimiento vacio"
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
                if (!e.e_nombre || e.e_nombre === "") flag = "etapa sin nombre"
                if (!e.fases) flag = "etapa sin fases"
                else if (e.fases.length === 0) flag = "etapa sin fases"
                else {
                    for(let i = 0; i < e.fases.length; i++){
                        let f = e.fases.find((fa) => fa.f_orden === i+1)
                        if (!f) flag = `fase de orden ${i+1} no presente`
                    }
        
                    e.fases.forEach((f) => {
                        if (f.f_duracion <= 0 ) flag = "fase de duracion negativa"
                        if (!f.f_nombre || f.f_nombre === "") flag = "fase sin nombre"
                        if (!f.cargos) flag = "fase sin cargos"
                        else if (f.cargos.length === 0) flag = "fase sin cargos"
                        else {
                            f.cargos.forEach((c) => {
                                if (c.c_id_cargo === 0 ) flag = "cargo invalido"
                                if (!c.f_cantidad || c.f_cantidad <=0) flag = "cantidad de cargos invalida"
                            })
                        }

                        if (f.maquinarias && f.maquinarias.length > 0 )
                            f.maquinarias.forEach((m) => {
                                if (m.m_id_maquinaria === 0) flag = "maquinaria invalida"
                                if (!m.f_cantidad || m.f_cantidad <=0) flag = "cantidad de maquinarias invalida"
                            })
                    })
                }                
            })
        }
        return flag
    }
}

const validadorProyecto = {
    validar (p)  {
        let flag = ""
        if (!p) flag = "Proyecto vacio"
        if (!p.p_nombre || p.p_nombre === "") flag = "Nombre del proyecto vacio"
        if (!p.p_fecha_inicio) flag = "Fecha de inicio del proyecto vacia"
        try {
            if (new Date(p.p_fecha_inicio) < new Date().getTime()) flag = "Fecha de inicio del proyecto menor a hoy"
        }catch (e) { 
            flag = "Formato de fecha invalida"
        }       
        
        if (!p.etapas) flag = "Proyecto sin etapas 1"
        else if (p.etapas.length === 0) flag = "Proyecto sin etapas 2"
        else{
            for(let i = 0; i < p.etapas.length; i++){
                let e = p.etapas.find((et) => et.e_orden === i+1)
                if (!e) flag = `Etapa de orden ${i+1} no presente`
            }

            p.etapas.forEach((e) => {
                if (!e.fases) flag = `Etapa ${e.e_orden} sin fases`
                else if (e.fases.length === 0) flag = `etapa ${e.e_orden} sin fases`
                else {
                    for(let i = 0; i < e.fases.length; i++){
                        let f = e.fases.find((fa) => fa.f_orden === i+1)
                        if (!f) flag = `fase de orden ${i+1} no presente`
                    }


                    e.fases.forEach((f) => {
                        if (f.f_fecha_inicio)
                            try {
                                if (new Date(f.f_fecha_inicio) < new Date().getTime()) flag = `Fecha de fase en etapa ${e.e_orden} fase ${f.f_orden}, menor a hoy`
                                if (f.fecha_fin && new Date(f.fecha_fin) < new Date(f.f_fecha_inicio)) ` Fecha_fin > fecha)inicio en etapa ${e.e_orden} fase ${f.f_orden}`
                            }catch (e) { 
                                flag = `Formato de fecha invalida en etapa ${e.e_orden} fase ${f.f_orden}`
                            }
                        if (!f.empleados) flag = `En etapa ${e.e_orden} fase ${f.f_orden}, fase sin empleados`
                        else if (f.empleados.length === 0) flag = `En etapa ${e.e_orden} fase ${f.f_orden}, fase sin empleados`
                        else {
                            f.empleados.forEach((empl) => {
                                if (empl.e_id_empleado === 0 ) flag = `En etapa ${e.e_orden} fase ${f.f_orden}, empleado no seleccionado`
                                if (empl.horario_id === 0 ) flag = `En etapa ${e.e_orden} fase ${f.f_orden}, horario no seleccionado`
                                if (empl.f_viatico && empl.f_viatico < 0 ) flag = `En etapa ${e.e_orden} fase ${f.f_orden}, viaticos negativos`
                                if (empl.f_salario && empl.f_salario < 0 ) flag = `En etapa ${e.e_orden} fase ${f.f_orden}, error en salario`
                            })
                        }

                        if (f.equipos && f.equipos.length > 0 )
                            f.equipos.forEach((equi) => {
                                if (equi.e_id_equipo === 0) flag = `En etapa ${e.e_orden} fase ${f.f_orden}, equipo no seleccionado`
                                if (!equi.f_costo_alquiler || equi.f_costo_alquiler <=0) flag = `En etapa ${e.e_orden} fase ${f.f_orden}, error en costo de alquiler de equipo`
                            })

                        if (f.gastos && f.gastos.length > 0 )
                        f.gastos.forEach((g) => {
                            if (!g.g_concepto || g.g_concepto === "") flag = `En etapa ${e.e_orden} fase ${f.f_orden}, gasto adicional sin concepto`
                            if (!g.g_monto || g.g_monto <=0) flag = `En etapa ${e.e_orden} fase ${f.f_orden}, error en monto de gasto adicional`
                        })
                    })
                }                
            })
        }
        return flag
    }
}

export {
    validadorYacimientoConfiguracion,
    validadorProyecto
}