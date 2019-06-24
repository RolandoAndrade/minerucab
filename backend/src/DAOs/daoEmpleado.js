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
            )
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


}

export {daoEmpleado}


