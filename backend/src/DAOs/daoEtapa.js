import {psql} from '../postgreConnection'

const daoEtapa = {

    modificarEstado(e_id_etapa,estado_id) {
        return psql.query(`
        UPDATE ETAPA
        SET estado_id = ${estado_id}
        WHERE e_id_etapa = ${e_id_etapa}
        `)
    }
}

export {daoEtapa}

