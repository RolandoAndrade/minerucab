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
        if (!p) flag += "Proyecto vacio\n"
        if (!p.p_nombre || p.p_nombre === "") flag += "Nombre del proyecto vacio\n"
        if (!p.p_fecha_inicio) flag += "Fecha de inicio del proyecto vacia\n"
        if (!p.yacimiento_id) flag += "proyecto sin yacimiento asociado\n"
        try {
            new Date(p.p_fecha_inicio)
        }catch (e) { 
            flag += "Formato de fecha invalida\n"
        }       
        
        if (!p.etapas) flag += "Proyecto sin etapas \n"
        else if (p.etapas.length === 0) flag += "Proyecto sin etapas \n"
        else{
            for(let i = 0; i < p.etapas.length; i++){
                let e = p.etapas.find((et) => et.e_orden === i+1)
                if (!e) flag += `Etapa de orden ${i+1} no presente\n`
            }

            p.etapas.forEach((e) => {
                if (!e.e_id_etapa_configuracion) flag += `Etapa ${e.e_orden} sin configuracion asociada\n`
                if (!e.fases) flag += `Etapa ${e.e_orden} sin fases\n`
                if (e.e_fecha_inicio && (new Date(e.e_fecha_inicio)).getTime() < (new Date(p.p_fecha_inicio)).getTime()) flag += `Fecha_inicio de etapa ${e.e_orden} < fecha_inicio del proyecto\n`
                else if (e.fases.length === 0) flag += `etapa ${e.e_orden} sin fases\n`
                else {
                    for(let i = 0; i < e.fases.length; i++){
                        let f = e.fases.find((fa) => fa.f_orden === i+1)
                        if (!f) flag += `fase de orden ${i+1} no presente\n`
                    }

                    e.fases.forEach((f) => {
                        if (f.f_fecha_inicio)
                            try {
                                if (!e.e_fecha_inicio ) flag += `Fecha_inicio de fase ${f.f_orden} seteada sin haber seteado fecha_inicio de etapa ${e.e_orden}\n`
                                if (e.e_fecha_inicio && (new Date(f.f_fecha_inicio)).getTime() < (new Date(e.e_fecha_inicio)).getTime()) flag += `Fecha_inicio de fase de orden ${f.f_orden} <  fecha_inicio de etapa de orden ${e.e_orden} \n`
                                if (f.f_fecha_fin && (new Date(f.f_fecha_fin)).getTime() < (new Date(f.f_fecha_inicio)).getTime()) flag += `Fecha_fin < fecha_inicio en etapa ${e.e_orden} fase ${f.f_orden}\n`
                            }catch (err) { 
                                flag += `Formato de fecha_fin invalida en etapa ${e.e_orden} fase ${f.f_orden}\n`
                            }
                        else if (f.f_fecha_fin) flag += `Fecha_fin sin Fecha_inicio en etapa ${e.e_orden} fase ${f.f_orden}\n`
                        if(!f.f_id_fase_configuracion) flag += `fase sin configuracion asociada en etapa ${e.e_orden} fase ${f.f_orden}\n`
                        if (!f.empleados) flag += `En etapa ${e.e_orden} fase ${f.f_orden}, fase sin empleados\n`
                        else if (f.empleados.length === 0) flag += `En etapa ${e.e_orden} fase ${f.f_orden}, fase sin empleados\n`
                        else {
                            f.empleados.forEach((empl) => {
                                if (empl.e_id_empleado === 0 ) flag += `En etapa ${e.e_orden} fase ${f.f_orden}, empleado no seleccionado\n`
                                if (empl.horario_id === 0 ) flag += `En etapa ${e.e_orden} fase ${f.f_orden}, horario no seleccionado\n`
                                if (empl.f_viatico && empl.f_viatico < 0 ) flag += `En etapa ${e.e_orden} fase ${f.f_orden}, viaticos negativos\n`
                                if (empl.f_salario && empl.f_salario < 0 ) flag += `En etapa ${e.e_orden} fase ${f.f_orden}, error en salario\n`
                            })
                        }

                        if (f.equipos && f.equipos.length > 0 )
                            f.equipos.forEach((equi) => {
                                if (equi.e_id_equipo === 0) flag += `En etapa ${e.e_orden} fase ${f.f_orden}, equipo no seleccionado\n`
                                if (!equi.f_costo_alquiler || equi.f_costo_alquiler <=0) flag += `En etapa ${e.e_orden} fase ${f.f_orden}, error en costo de alquiler de equipo\n`
                            })

                        if (f.gastos && f.gastos.length > 0 )
                        f.gastos.forEach((g) => {
                            if (!g.g_concepto || g.g_concepto === "") flag += `En etapa ${e.e_orden} fase ${f.f_orden}, gasto adicional sin concepto\n`
                            if (!g.g_monto || g.g_monto <=0) flag += `En etapa ${e.e_orden} fase ${f.f_orden}, error en monto de gasto adicional\n`
                        })
                    })
                }                
            })
        }
        return flag
    }
}

const validadorGestorProyecto = {

    validarActivarFase (inicio_etapa, inicio_fase, fase_id) {
        let flag = ""
        try {
            if((new Date(inicio_fase)).getTime() < (new Date(inicio_etapa)).getTime()) 
                flag += `Fecha de inicio de fase menor a la de la etapa\n`
        }
        catch(e){
            flag += `Formato de fecha invalida`
        }

        if(fase_id <= 0) flag += `ID fase invalido o vacio\n`

        return flag
    },

    validarFinalizarFase (inicio_fase, final_fase, fase_id) {
        let flag = ""
        try {
            if((new Date(final_fase)).getTime() < (new Date(inicio_fase)).getTime()) 
                flag += `Fecha de inicio de fase menor a la de la etapa\n`
        }
        catch(e){
            flag += `Formato de fecha invalida\n`
        }

        if(fase_id <= 0) flag += `ID fase invalido o vacio\n`

        return flag
    },

    validarActivaEtapa (inicio_proyecto, inicio_etapa, etapa_id) {
        let flag = ""
        try {
            if((new Date(inicio_etapa)).getTime() < (new Date(inicio_proyecto)).getTime()) 
                flag += `Fecha de inicio de etapa menor a la del proyecto\n`
        }
        catch(e){
            flag += `Formato de fecha invalida`
        }

        if(etapa_id <= 0) flag += `ID etapa invalido o vacio\n`

        return flag
    }
}

const validadorUsuarios = {
    validarClaves (usuarios) {
        console.log("validando usuarios")
        if(!usuarios) return false
        usuarios.forEach((u) => {
            if(!u.u_clave || u.u_clave === "") {
                return false
            }
            if(!u.u_correo || u.u_correo === "") {
                return false
            }
            if(!u.rol_id || u.rol_id === 0) {
                return false
            }
        })
        return true
    }
}

export {
    validadorYacimientoConfiguracion,
    validadorProyecto,
    validadorGestorProyecto,
    validadorUsuarios
}