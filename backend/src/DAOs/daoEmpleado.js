import {psql} from '../postgreConnection'

const daoEmpleado = {
    consultarTodos() {
        return psql.query(`
            SELECT * FROM EMPLEADO
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

    insertar({ e_cedula, e_nombre, e_segundo_nombre, e_apellido, e_segundo_apellido, e_telefono, e_fecha_nacimiento, e_fecha_ingreso, cargo_id, lugar_id, estado_id }){
        return psql.query(`
            INSERT INTO EMPLEADO (e_id_empleado, e_cedula, e_nombre, e_segundo_nombre, e_apellido, e_segundo_apellido, e_telefono, e_fecha_nacimiento, e_fecha_ingreso, cargo_id, lugar_id, estado_id )
            VALUES ( 
                DEFAULT,
                '${e_cedula}',
                '${e_nombre}',
                ${e_segundo_nombre ? `'${e_segundo_nombre}'` : 'NULL'},
                '${e_apellido}',
                ${e_segundo_apellido ? `'${e_segundo_apellido}'` : 'NULL'},
                ${e_telefono ? `'${e_telefono}'` : 'NULL'},
                '${e_fecha_nacimiento}',
                '${e_fecha_ingreso}',
                ${cargo_id},
                ${lugar_id},
                ${estado_id}
            )
        `)
    },

    modificar({ e_id_empleado, e_cedula, e_nombre, e_segundo_nombre, e_apellido, e_segundo_apellido, e_telefono, e_fecha_nacimiento, e_fecha_ingreso, cargo_id, lugar_id, estado_id }){
        return psql.query(`
            UPDATE EMPLEADO SET
                e_cedula = '${e_cedula}',
                e_nombre = '${e_nombre}',
                e_segundo_nombre = ${e_segundo_nombre ? `'${e_segundo_nombre}'` : 'NULL'},
                e_apellido = '${e_apellido}',
                e_segundo_apellido = ${e_segundo_apellido ? `'${e_segundo_apellido}'` : 'NULL'},
                e_telefono = ${e_telefono ? `'${e_telefono}'` : 'NULL'},
                e_fecha_nacimiento = '${e_fecha_nacimiento}',
                e_fecha_ingreso = '${e_fecha_ingreso}',
                cargo_id = ${cargo_id},
                lugar_id = ${lugar_id},
                estado_id = ${estado_id}
                WHERE e_id_empleado = ${e_id_empleado}
        `)
    },


}

export {daoEmpleado}


