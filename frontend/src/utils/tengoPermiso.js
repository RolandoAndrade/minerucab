const tengoPermiso = (permiso) =>
    !! JSON.parse( 
        localStorage.getItem("user") 
    )
    .permisos.find( 
        p => p.a_id_accion === permiso 
    )

export { tengoPermiso }