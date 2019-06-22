import React from 'react'
// POR LOS MOMENTOS ESTA MUY CHIMBO

export const Loader = () => ( 
    <div 
        style={{ 
            position: "block",
            width: "100%", 
            height: "100%",
            background : "rgb(30, 37 , 79)",
        }}>
        <div className="lds-dual-ring"></div>
    </div>
)