import React from "react";
import Swal from "sweetalert2";


export class GuardarCancelar extends React.Component {

    saveData()
    {
        Swal.fire({
            title: '¿Está seguro?',
            text: 'Se guardaran los datos con la información dada',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, guardar',
            cancelButtonText: 'No, editar',
            confirmButtonColor: "#1CA1DC",
            cancelButtonColor: "#dc3832"
        }).then(async (result) =>
        {
            if (result.value)
            {
                if (await this.props.storeData())
                {
                    Swal.fire(
                        'Guardado',
                        'Los datos fueron guardados satisfactoriamente',
                        'success'
                    );

                    //Éxito
                    this.props.success();
                } else
                {
                    Swal.fire(
                        'Error',
                        'No se pudo guardar, revise los campos e intente nuevamente',
                        'error'
                    )
                }
            } else if (result.dismiss === Swal.DismissReason.cancel)
            {
                Swal.fire(
                    'Cancelado',
                    'Se ha detenido el proceso de guardado',
                    'error'
                )
            }
        })
    }

    dismiss()
    {
        Swal.fire({
            title: '¿Está seguro?',
            text: 'Todos los datos introducidos se perderán',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, salir',
            cancelButtonText: 'No, editar',
            confirmButtonColor: "#1CA1DC",
            cancelButtonColor: "#dc3832"
        }).then((result) => {
            if (result.value)
            {
                this.props.decline();
            }
        })
    }

    render = () => (
        <div className="GuardarCancelar" style={this.props.position?{textAlign: this.props.position}:{}}>
            <div className="GC ButtonPrimary" onClick={()=>this.saveData()}>
                Guardar
            </div>
            <div className="GC ButtonSecondary" onClick={()=>this.dismiss()}>
                Cancelar
            </div>
        </div>
    )
}



