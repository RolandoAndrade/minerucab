import {psql} from '../postgreConnection'

const daoEtapa = {

    consultar( e_id_etapa){
        return psql.query(`
            SELECT * FROM ETAPA E, ETAPA_CONFIGURACION EC
            WHERE E.e_id_etapa = ${e_id_etapa}
                AND E.etapa_configuracion_id = EC.e_id_etapa_configuracion
        `)
    },

    consultarTodosProyecto(proyecto_id){
        return psql.query(`
            SELECT E.*, EC.*
            FROM ETAPA E, ETAPA_CONFIGURACION EC
            WHERE proyecto_id = ${proyecto_id}
                AND E.etapa_configuracion_id = EC.e_id_etapa_configuracion
        `)
    },

    insertar(e_fecha_inicio,estado_id,proyecto_id,etapa_configuracion_id){
        const qry = `
        INSERT INTO ETAPA (e_id_etapa,e_fecha_inicio,estado_id,proyecto_id,etapa_configuracion_id) VALUES  
            (DEFAULt,${e_fecha_inicio ? `'${e_fecha_inicio}'`:'null'},${estado_id},${proyecto_id},${etapa_configuracion_id}) RETURNING e_id_etapa_configuracion;
        `
        return psql.query(qry)
    },

    modificarEstado(e_id_etapa,estado_id) {
        return psql.query(`
        UPDATE ETAPA
        SET estado_id = ${estado_id}
        WHERE e_id_etapa = ${e_id_etapa}
        `)
    }
}

export {daoEtapa}

