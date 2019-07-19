import {psql} from '../postgreConnection'

const daoEmpleado = {
    consultarTodos() {
        return psql.query(`
            SELECT 
                E.e_id_empleado,
                E.e_cedula,
                E.e_genero,
                E.e_nombre,
                E.e_segundo_nombre,
                E.e_apellido,
                E.e_segundo_apellido,
                E.e_telefono,
                E.e_fecha_nacimiento,
                E.e_fecha_ingreso,
                E.cargo_id,
                E.lugar_id,
                E.estado_id,
                L.l_nombre lugar,
                C.c_nombre cargo,
                EST.e_nombre estado
            FROM EMPLEADO E, LUGAR L, CARGO C, ESTADO EST
            WHERE
                E.lugar_id =  L.l_id_lugar AND
                E.cargo_id = C.c_id_cargo  AND
                E.estado_id =  EST.e_id_estado
        `)
    },

    consultar( id ){
        return psql.query(`
            SELECT * FROM EMPLEADO
            WHERE e_id_empleado = ${id}
        `)
    },

    eliminar( id ){
        return psql.query(`
            DELETE FROM EMPLEADO
            WHERE e_id_empleado = ${id}
        `)
    },

    insertar({ e_cedula, e_nombre, e_segundo_nombre, e_apellido, e_segundo_apellido, e_telefono, e_fecha_nacimiento, e_fecha_ingreso, e_genero, cargo_id, lugar_id, estado_id }){
        return psql.query(`
            INSERT INTO EMPLEADO (e_id_empleado, e_cedula, e_nombre, e_segundo_nombre, e_apellido, e_segundo_apellido, e_telefono, e_fecha_nacimiento, e_fecha_ingreso, e_genero, cargo_id, lugar_id, estado_id )
            VALUES ( 
                DEFAULT,
                ${e_cedula ? `'${e_cedula}'` : 'NULL' },
                ${e_nombre ? `'${e_nombre}'` : 'NULL' },
                ${e_segundo_nombre ? `'${e_segundo_nombre}'` : 'NULL'},
                ${e_apellido ? `'${e_apellido}'` : 'NULL' },
                ${e_segundo_apellido ? `'${e_segundo_apellido}'` : 'NULL'},
                ${e_telefono ? `'${e_telefono}'` : 'NULL'},
                ${e_fecha_nacimiento ? `'${e_fecha_nacimiento}'` : 'NULL' },
                ${e_fecha_ingreso ? `'${e_fecha_ingreso}'` : 'NULL' },
                ${e_genero ? `'${e_genero}'` : 'NULL' },
                ${cargo_id ? cargo_id : 'NULL' },
                ${lugar_id ? lugar_id : 'NULL' },
                ${estado_id ? estado_id : 'NULL' }
            ) RETURNING (e_id_empleado);
        `)
    },

    modificar({ e_id_empleado, e_cedula, e_nombre, e_segundo_nombre, e_apellido, e_segundo_apellido, e_telefono, e_fecha_nacimiento, e_fecha_ingreso, e_genero, cargo_id, lugar_id, estado_id }){
        return psql.query(`
            UPDATE EMPLEADO SET
                e_cedula = ${e_cedula ? `'${e_cedula}'` : 'NULL' },
                e_nombre = ${e_nombre ? `'${e_nombre}'` : 'NULL' },
                e_segundo_nombre = ${e_segundo_nombre ? `'${e_segundo_nombre}'` : 'NULL'},
                e_apellido = ${e_apellido ? `'${e_apellido}'` : 'NULL' },
                e_segundo_apellido = ${e_segundo_apellido ? `'${e_segundo_apellido}'` : 'NULL'},
                e_telefono = ${e_telefono ? `'${e_telefono}'` : 'NULL'},
                e_fecha_nacimiento = ${e_fecha_nacimiento ? `'${e_fecha_nacimiento}'` : 'NULL' },
                e_fecha_ingreso = ${e_fecha_ingreso ? `'${e_fecha_ingreso}'` : 'NULL' },
                e_genero = ${e_genero ? `'${e_genero}'` : 'NULL' },
                cargo_id = ${cargo_id ? cargo_id : 'NULL' },
                lugar_id = ${lugar_id ? lugar_id : 'NULL' },
                estado_id = ${estado_id ? estado_id : 'NULL' }
                WHERE e_id_empleado = ${e_id_empleado}
        `)
    },

    modificarEstatusEmpleados(empleados, estatus_id){
        let query = `
            UPDATE EMPLEADO
            SET estado_id = ${estatus_id}
            WHERE e_id_empleado IN (
        `
        let i = 0
        empleados.forEach( e => {
            i++;
            query = query + `${e.e_id_empleado}${i < empleados.length ? ',' : ');' } `
        })
        console.log(query)
        return psql.query(query)
    },

    liberarEmpleadosProyecto(p_id){
        let query = `
            UPDATE EMPLEADO
            SET estado_id = 11
            WHERE e_id_empleado IN (
            SELECT FE.empleado_id FROM FASE_EMPL FE, FASE F, ETAPA E
            WHERE FE.fase_id = F.f_id_fase
            AND F.etapa_id = E.e_id_etapa
            AND E.proyecto_id = ${p_id});
        `
        console.log(query)
        return psql.query(query)
    },

    liberarEmpleadosFase(fase_id){
        let query = `
            UPDATE EMPLEADO
            SET estado_id = 11
            WHERE e_id_empleado IN (
            SELECT empleado_id FROM FASE_EMPL
            WHERE fase_id = ${fase_id});
        `
        console.log(query)
        return psql.query(query)
    },

    consultarUsuarios(empleado_id) {
        return psql.query(`
            SELECT * 
            FROM USUARIO
            WHERE empleado_id = ${empleado_id}
        `)
    },

    asignarVariosUsuarios ( empleado_id, usuarios) {
        let query = `INSERT INTO USUARIO (u_id_usuario,u_correo,u_clave,empleado_id,rol_id) VALUES`
        let i = 0
        usuarios.forEach( u => {
            i++;
            query =  query + `(DEFAULT,'${u.u_correo}','${u.u_clave}',${empleado_id},${u.rol_id})${i < usuarios.length ? ',' : ';' }`
        })
        console.log(query)
        return psql.query(query)
    }
}

export {daoEmpleado}


