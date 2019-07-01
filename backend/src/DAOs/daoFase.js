import {psql} from '../postgreConnection'

const daoFase = {
    consultarTodosEtapa(etapa_id) {
        return psql.query(`
            SELECT * FROM FASE
            WHERE etapa_id = ${etapa_id}
        `)
    },

    consultar( id ){
        return psql.query(`
            SELECT * FROM FASE
            WHERE f_id_fase = ${id}
        `)
    },

    insertar(f_fecha_inicio,f_fecha_fin,etapa_id,fase_configuracion_id,estado_id) {
        const qry = `
            INSERT INTO FASE (f_id_fase,f_fecha_inicio,f_fecha_fin,etapa_id,fase_configuracion_id,estado_id) VALUES 
            (DEFAULT,'${f_fecha_inicio}','${f_fecha_fin}',${f_duracion},${etapa_id},${fase_configuracion_id},${estado_id}) RETURNING (f_id_fase_configuracion);
        `
        console.log(qry)
        return psql.query(qry)
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