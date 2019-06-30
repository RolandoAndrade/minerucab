import {psql} from '../postgreConnection'

const daoFase = {
    modificarEstado(f_id_fase,estado_id){
        return psql.query(`
        UPDATE FASE
        SET estado_id = ${estado_id}
        WHERE f_fase = ${f_id_fase}
        `)
    }
}

export {daoFase}