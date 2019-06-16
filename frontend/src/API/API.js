const API = {
    consultarTodos(tabla) {
        switch (tabla.toUpperCase()){
            case "MINERAL" : 
                return ([
                    {
                        id: 1,
                        nombre: "Oro",
                        esMetal: "Si",
                        esRadioactivo: "No",
                        nacionalizado: "No",
                        yacimientos : ["La Guaira", "Alemania", "Trinidad"],
                        compuestos : [{
                                id : 32,
                                nombre :"Hierro"
                            },{
                                id : 37,
                                nombre :"Bauxita"
                        }],
                        descripcion: "is simply dummy text of the printing and typesettingly dummy text of the printing and typesettingly dummy text of the printing and typesettingly dummy text of the printing and typesettingly dummy text of the printing and typesettingly dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                    },
                    {
                        id: 3,
                        nombre: "Plata",
                        esMetal: "Si",
                        esRadioactivo: "Si",
                        nacionalizado: "1998-05-15",
                        yacimientos : ["Delta Amacuro", "Tucupita", "Barquisimeto"],
                        descripcion: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia"
                    }
                ]) 
                break;
        }
    }
}

export { API }