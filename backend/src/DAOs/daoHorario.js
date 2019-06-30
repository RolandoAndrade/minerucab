import {psql} from '../postgreConnection'

const daoHorario = {
    consultarTodos() {
        return psql.query(`
            SELECT H.h_nombre, J.*  
            FROM HORARIO H, JORNADA J
            WHERE J.horario_id=H.h_id_horario
        `)
    },

    consultar( id ){
        return psql.query(`
            SELECT H.h_nombre, J.*  
            FROM HORARIO H, JORNADA J
            WHERE J.horario_id=H.h_id_horario
            AND J.horario_id= ${id}
        `)
    },

    insertar({h_nombre}){
        return psql.query(`
            INSERT INTO HORARIO (h_id_horario, h_nombre)
            VALUES (DEFAULT,
                    ${h_nombre ? `'${h_nombre}'` : 'NULL'}) 
                    RETURNING (h_id_horario)
            `)
    }  ,

    insertarJornada({ j_dia,j_hora_entrada,j_hora_salida, horario_id }){
        return psql.query(`
            INSERT INTO JORNADA (j_id_jornada, j_dia,j_hora_entrada,j_hora_salida, horario_id)
            VALUES (DEFAULT,
                    ${j_dia ? `'${j_dia}'` : 'NULL'},
                    ${j_hora_entrada ? `'${j_hora_entrada}'` : 'NULL'},
                    ${j_hora_salida ? `'${j_hora_salida}'` : 'NULL'},
                    ${horario_id ? `'${horario_id}'` : 'NULL'}
                    ) 
                    RETURNING (j_id_jornada)
            `)
    },

    eliminarJornadas(id)
    {
        return psql.query(`
            DELETE FROM JORNADA
            WHERE horario_id=${id}
            `)
    },
    modificar({ horario_id, h_nombre }){
        return psql.query(`
            UPDATE HORARIO SET
                h_nombre = ${h_nombre ? `'${h_nombre}'` : 'NULL' }
                WHERE h_id_horario = ${horario_id}
        `)
    },

    eliminar(id)
    {
        return psql.query(`
            DELETE FROM HORARIO
            WHERE h_id_horario=${id}
            `)
    }
}

export {daoHorario}
