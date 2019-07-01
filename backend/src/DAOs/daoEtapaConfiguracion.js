import {psql} from '../postgreConnection'

const daoEtapaConfiguracion = {

    consultar( e_id_etapa_configuracion){
        return psql.query(`
            SELECT * FROM ETAPA_CONFIGURACION
            WHERE e_id_etapa_configuracion = ${e_id_etapa_configuracion}
        `)
    },
    
    consultarTodosYacimiento(yacimiento_configuracion_id){
        return psql.query(`
            SELECT * FROM ETAPA_CONFIGURACION
            WHERE yacimiento_configuracion_id = ${yacimiento_configuracion_id}
        `)
    },

    insertar(e_nombre,e_orden,e_tipo,yacimiento_configuracion_id){
        const qry = `
            INSERT INTO ETAPA_CONFIGURACION (e_id_etapa_configuracion,e_nombre,e_orden,e_tipo,yacimiento_configuracion_id) VALUES 
            (DEFAULt,${e_nombre ? `'${e_nombre}'` : 'null'},${e_orden},${e_tipo ? `'${e_tipo}'` : 'null'},${yacimiento_configuracion_id}) RETURNING e_id_etapa_configuracion;
        `
        return psql.query(qry)
    },
}

export {daoEtapaConfiguracion}