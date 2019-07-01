import {psql} from '../postgreConnection'

const daoFaseConfiguracion = {
    consultarTodosEtapa(etapa_configuracion_id) {
        return psql.query(`
            SELECT * FROM FASE_CONFIGURACION
            WHERE etapa_configuracion_id = ${etapa_configuracion_id}
        `)
    },

    consultar( id ){
        return psql.query(`
            SELECT * FROM FASE_CONFIGURACION
            WHERE f_id_fase_configuracion = ${id}
        `)
    },

    insertar(f_nombre,f_orden,f_duracion,f_descripcion,etapa_configuracion_id,unidad_id) {
        const qry = `
            INSERT INTO FASE_CONFIGURACION (f_id_fase_configuracion,f_nombre,f_orden,f_duracion,f_descripcion,etapa_configuracion_id,unidad_id) VALUES 
            (DEFAULT,${f_nombre ? `'${f_nombre}'` : 'null'},${f_orden},${f_duracion},${f_descripcion ? `'${f_descripcion}'` : 'null'},${etapa_configuracion_id},${unidad_id}) RETURNING (f_id_fase_configuracion);
        `
        return psql.query(qry)
    },

    consultarCargos(fase_configuracion_id){
        return psql.query(`
            SELECT F.f_id_fase_cargo,F.f_cantidad,C.c_nombre,C.c_id_cargo
            FROM FASE_CARG F, CARGO C
            WHERE fase_configuracion_id = ${fase_configuracion_id}
                    AND F.cargo_id = C.c_id_cargo
        `)
    },

    consultarMaquinarias(fase_configuracion_id){
        return psql.query(`
            SELECT F.f_id_fase_maqu,F.f_cantidad,M.m_nombre,M.m_id_maquinaria
            FROM FASE_MAQU F, MAQUINARIA M
            WHERE fase_configuracion_id = ${fase_configuracion_id}
                    AND F.maquinaria_id = M.m_id_maquinaria
        `)
    },

    asignarVariosCargo(fase_configuracion_id,cargos){
        let query = `INSERT INTO FASE_CARG (f_id_fase_cargo,fase_configuracion_id,f_cantidad,cargo_id) VALUES `
        let i = 0
        cargos.forEach( c => {
            i++;
            query = query + `(DEFAULT, ${fase_configuracion_id}, ${c.f_cantidad},${c.c_id_cargo})${i < cargos.length ? ',' : ';' } `
        })
        return psql.query(query)
    },

    asignarCargo(fase_configuracion_id,f_cantidad,cargo_id){
        return psql.query(`
            INSERT INTO FASE_CARG (f_id_fase_cargo,fase_configuracion_id,f_cantidad,cargo_id) VALUES
            (DEFAULT,${fase_configuracion_id},${f_cantidad},${cargo_id}) RETURNING id
        `)
    },

    asignarVariosMaquinaria(fase_configuracion_id,maquinarias){
        let query = `INSERT INTO FASE_MAQU (f_id_fase_maqu,fase_configuracion_id,maquinaria_id,f_cantidad) VALUES `
        let i = 0;
        maquinarias.forEach( m => {
            i++;
            query =  query + `(DEFAULT,${fase_configuracion_id},${m.m_id_maquinaria},${m.f_cantidad})${i < maquinarias.length ? ',' : ';' }`
        })
        return psql.query(query)
    },

    asignarMaquinaria(fase_configuracion_id,maquinaria_id,f_cantidad){
        return psql.query(`
            INSERT INTO FASE_MAQU (f_id_fase_maqu,fase_configuracion_id,maquinaria_id,f_cantidad) VALUES
            (DEFAULT,${fase_configuracion_id},${maquinaria_id},${f_cantidad}) RETURNING id
        `)
    }
}

export {daoFaseConfiguracion}