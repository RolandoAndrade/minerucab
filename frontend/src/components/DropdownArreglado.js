import React from 'react';

export const DropdownArreglado = ({ options , className, defaultID, ...rest}) => (
        <div>
            <select
                className="DropdownArreglado" 
                {...rest}
            >
                {
                    options.map( (elem, i) => 
                            <option 
                                className={`DrowpdownArregladoItem ${className}`}
                                key={i} 
                                value={elem.id}
                                selected={elem.id === defaultID}
                            >
                                {elem.text}
                            </option>
                        )
                }
            </select>
        </div>
    )