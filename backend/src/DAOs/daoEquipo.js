import {psql} from '../postgreConnection'

const daoEquipo = {
    consultarTodos() {
        return psql.query(`
            SELECT * FROM EQUIPO
        `)
    },

    consultar( id ){
        return psql.query(`
            SELECT * FROM EQUIPO
            WHERE e_id_equipo = ${id}
        `)
    },

    modificarEstatusEquipos(equipos, estatus_id){
        let query = `
            UPDATE EQUIPO
            SET estado_id = ${estatus_id}
            WHERE e_id_equipo IN (
        `
        let i = 0
        equipos.forEach( e => {
            i++;
            query = query + `${e.e_id_equipo}${i < equipos.length ? ',' : ');' } `
        })
        console.log(query)
        return psql.query(query)
    },

    liberarEquiposProyecto(p_id){
        let query = `
            UPDATE EQUIPO
            SET estado_id = 11
            WHERE e_id_equipo IN (
            SELECT FE.equipo_id FROM FASE_EQUI FE, FASE F, ETAPA E
            WHERE FE.fase_id = F.f_id_fase
            AND F.etapa_id = E.e_id_etapa
            AND E.proyecto_id = ${p_id});
        `
        console.log(query)
        return psql.query(query)
    },

    liberarEquiposFase(fase_id){
        let query = `
            UPDATE EQUIPO
            SET estado_id = 11
            WHERE e_id_equipo IN (
            SELECT equipo_id FROM FASE_EQUI
            WHERE fase_id = ${fase_id});
        `
        console.log(query)
        return psql.query(query)
    }
}

export {daoEquipo}
