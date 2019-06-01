const API = {
    consultarTodos(tabla) {
        switch (tabla.toUpperCase()){
            case "MINERAL" : 
                return ([
                    {
                        id: 1,
                        nombre: "Oro",
                        esMetal: true,
                        esRadiactivo: false,
                        nacionalizado: null
                    },
                    {
                        id: 3,
                        nombre: "Plata",
                        esMetal: true,
                        esRadiactivo: true,
                        nacionalizado: "15/05/1998"
                    }
                ]) 
                break;
        }
    }
}

export { API }