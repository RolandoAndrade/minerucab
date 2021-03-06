import {psql} from '../postgreConnection'

const daoSolicitud = {
    consultarTodos() {
        return psql.query(`
            SELECT S.*, P.p_nombre, E.e_nombre
            FROM SOLICITUD S, PROYECTO P, ESTADO E
            WHERE S.proyecto_id = P.p_id_proyecto
            AND S.estado_id = E.e_id_estado
        `)
    },

    consultar( id ){
        return psql.query(`
            SELECT S.*, P.p_nombre, E.e_nombre
            FROM SOLICITUD S, PROYECTO P, ESTADO E
            WHERE S.proyecto_id = P.p_id_proyecto
            AND S.estado_id = E.e_id_estado
            AND S.s_id_solicitud = ${id}
        `)
    },

    eliminar( id ){
        return psql.query(`
            DELETE FROM SOLICITUD
            WHERE s_id_solicitud = ${id}
        `)
    },

    insertar(proyecto_id) {
        let query = `
        INSERT INTO SOLICITUD (s_id_solicitud,s_fecha_solicitud,s_fecha_pago,proyecto_id,estado_id) 
        VALUES (DEFAULT,now(), now(), ${proyecto_id}, 6) RETURNING (s_id_solicitud);
        `
        console.log(`\nInsertar solicitud:\n${query}`)
        return psql.query(query)
    },

    asignarVariosArticulos(s_id_solicitud, articulos) {
        let query = `
        INSERT INTO PROD_SOLI (p_id_prod_soli,p_cantidad,p_precio_compra,solicitud_id,prod_comp_id,unidad_id) 
        VALUES `
        let i = 0;
        articulos.forEach(a => {
            i++
            query += `(DEFAULT,${a.p_cantidad},${a.p_precio_estimado*1.2},${s_id_solicitud},${a.p_id_prod_comp},11)${i < articulos.length ? ',' : ';' }`
        });
        console.log(`\nAsignarVariosArticulos:\n${query}`)
        return psql.query(query)
    },

    atenderSolicitud(s_id_solicitud){
        let query = `
        UPDATE SOLICITUD
        SET estado_id = 14
        WHERE s_id_solicitud = ${s_id_solicitud}`
        console.log(`\nAtender Solicitud:\n${query}`)
        return psql.query(query)
    },

    obtenerArticulosSolicitados(s_id_solicitud) {
        let query = `
        SELECT PS.p_cantidad, P.p_peso, P.mineral_id
        FROM PROD_SOLI PS, PROD_COMP PC, PRODUCTO P
        WHERE PS.prod_comp_id = PC.p_id_prod_comp
        AND PC.producto_id = P.p_id_producto
        AND PS.solicitud_id = ${s_id_solicitud}`
        console.log(`\nObtener Articulos Solicitados:\n${query}`)
        return psql.query(query)
    },

    almacenarProductos(s_id_solicitud, articulos) {
        let query = `
        INSERT INTO INVENTARIO (i_id_inventario,i_cantidad,i_ingresado,i_fecha_modificacion,mineral_id,unidad_id,proyecto_id,solicitud_id,pedido_id)
        VALUES `
        let i = 0
        articulos.forEach((a) => {
            i++
            query += `(DEFAULT,${a.p_cantidad*a.p_peso},TRUE,now(),${a.mineral_id},6,NULL,${s_id_solicitud},NULL)${i < articulos.length ? ',' : ';' }`
        })
        console.log(`\nAlmacenar Productos:\n${query}`)
        return psql.query(query)
    },

    obtenerProyectoPedidoDisparador(s_id_solicitud){
        let query = `
        SELECT P.pedido_id, S.proyecto_id
        FROM PROYECTO P, SOLICITUD S
        WHERE S.proyecto_id = P.p_id_proyecto
        AND S.s_id_solicitud = ${s_id_solicitud}
        LIMIT 1;`
        console.log(`\nObtener Proyecto Pedido Disparador:\n${query}`)
        return psql.query(query)
    }
}

export {daoSolicitud}