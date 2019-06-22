import React from 'react';

export const DropdownArreglado = ({ options , className, ...rest}) => (
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
                                value={elem.value}
                            >
                                {elem.text}
                            </option>
                        )
                }
            </select>
        </div>
    )