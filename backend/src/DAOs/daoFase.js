import {psql} from '../postgreConnection'

const daoFase = {
    consultarTodosEtapa(etapa_id) {
        return psql.query(`
            SELECT * FROM FASE F, FASE_CONFIGURACION FC
            WHERE F.etapa_id = ${etapa_id}
            AND F.fase_configuracion_id = FC.f_id_fase_configuracion
        `)
    },

    consultar( id ){
        return psql.query(`
            SELECT * FROM FASE F, FASE_CONFIGURACION FC
            WHERE f.f_id_fase = ${id}
                AND F.fase_configuracion_id = FC.f_id_fase_configuracion
        `)
    },

    insertar(f_fecha_inicio,f_fecha_fin,etapa_id,fase_configuracion_id,estado_id) {
        const qry = `
            INSERT INTO FASE (f_id_fase,f_fecha_inicio,f_fecha_fin,etapa_id,fase_configuracion_id,estado_id) VALUES 
            (DEFAULT,${f_fecha_inicio ? `'${f_fecha_inicio}'` : 'null'},
            ${f_fecha_fin ? `'${f_fecha_fin}'` : 'null'},${f_duracion},
            ${etapa_id},${fase_configuracion_id},${estado_id}) RETURNING (f_id_fase);
        `
        console.log(qry)
        return psql.query(qry)
    },

    consultarEmpleados(fase_id){
        return psql.query(`
            SELECT F.*,E.e_id_empleado, E.e_nombre, E.e_segundo_nombre, E.e_apellido, E.e_segundo_apellido, C.c_id_cargo, C.c_nombre
            FROM FASE_EMPL F, EMPLEADO E, CARGO C
            WHERE F.fase_id = ${fase_id}
                AND F.empleado_id = E.e_id_empleado
                AND E.cargo_id = C.c_id_cargo
        `)
    },

    asignarVariosEmpleados(fase_id,empleados){
        let query = `INSERT INTO FASE_EMPL (f_id_fase_empl,f_viatico,f_salario,empleado_id,fase_id,horario_id,unidad_id) VALUES `
        let i = 0
        empleados.forEach( e => {
            i++;
            query = query + `(DEFAULT, ${e.f_viatico}, ${e.f_salario},${e.e_id_empleado},${fase_id},${e.h_id_horario},${e.unidad_id})${i < cargos.length ? ',' : ';' } `
        })
        console.log(query)
        return psql.query(query)
    },

    consultarEquipos(fase_id){
        return psql.query(`
            SELECT F.*, E.e_id_equipo, E.e_marca, E.e_serial, M.m_id_maquinaria, M.m_nombre
            FROM FASE_EQUI F, EQUIPO E, MAQUINARIA M
            WHERE fase_id = ${fase_id}
                AND F.equipo_id = E.e_id_equipo
                AND E.maquinaria_id = M.m_id_maquinaria
        `)
    },

    asignarVariosEquipos(fase_id,equipos){
        let query = `INSERT INTO FASE_EQUI (f_id_fase_equi,f_costo_alquiler,unidad_id,unidad_id,fase_id) VALUES `
        let i = 0;
        equipos.forEach( e => {
            i++;
            query =  query + `(DEFAULT,${e.f_costo_alquiler},${e.unidad_id},${e.unidad_id},${fase_id})${i < maquinarias.length ? ',' : ';' }`
        })
        return psql.query(query)
    },

    consultarGastos(fase_id) {
        return psql.query(`
            SELECT * 
            FROM GASTO_ADICIONAL
            WHERE fase_id = ${fase_id}
        `)
    },

    asignarVariosGastos ( fase_id, gastos) {
        let query = `INSERT INTO GASTO_ADICIONAL (g_id_gasto_adicional,g_monto,g_concepto,unidad_id,fase_id) VALUES`
        let i = 0
        gastos.forEach( g => {
            i++;
            query =  query + `(DEFAULT,${g.g_monto},${e.unidad_id},${g.g_concepto ? `'${g.g_concepto}'`:'null'},${g.unidad_id},${fase_id})${i < maquinarias.length ? ',' : ';' }`
        })
        return psql.query(query)
    },


    modificarEstado(f_id_fase,estado_id){
        return psql.query(`
        UPDATE FASE
        SET estado_id = ${estado_id}
        WHERE f_fase = ${f_id_fase}
        `)
    }
}

export {daoFase}