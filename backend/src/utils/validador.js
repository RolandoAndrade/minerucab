const validadorYacimientoConfiguracion = {
    validar (y)  {
        if (!y) return false
        if (y.y_capacidad_explotacion <= 0 ) return false
        if (!y.etapas) return false
        if (y.etapas.length === 0) return false

        for(let i = 0; i < y.etapas.length; i++){
            let e = y.etapas.find((e) => e.e_orden === i+1)
            if (!e) return false
        }

        y.etapas.forEach((e,j) => {
            if (!e.fases) return false
            if (e.fases.length === 0) return false

            for(let i = 0; i < e.fases.length; i++){
                let e = e.fases.find((e) => e.e_orden === i+1)
                if (!e) return false
            }

            e.fases.forEach((f,k) => {
                if (f.f_duracion <= 0 ) return false
                if (!f.cargos) return false
                if (f.cargos.length === 0) return false
            })
        })

        return true
    }
}

export {
    validadorYacimientoConfiguracion
}