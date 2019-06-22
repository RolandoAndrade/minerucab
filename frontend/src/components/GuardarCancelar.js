import React from "react";


export class GuardarCancelar extends React.Component {


    render = () => (
        <div className="GuardarCancelar" style={this.props.position?{textAlign: this.props.position}:{}}>
            <div className="GC ButtonPrimary" onClick={this.props.accept}>
                Guardar
            </div>
            <div className="GC ButtonSecondary" onClick={this.props.decline}>
                Cancelar
            </div>
        </div>
    )
}



