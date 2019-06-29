import React, { Component }from 'react';
import Select from 'react-select';


export const DropdownV2 = (props) => (
    <Select
        {...props}
        styles={{
            option : (provided, state) => ({
                ...provided,
                backgroundColor : "#1CA1DC",
                color : "white"
            }),
            control :  (provided, state) => ({
                ...provided,
                backgroundColor : "#1CA1DC",
                color : "white"
            }),
            placeholder : (provided, state) => ({
                ...provided,
                backgroundColor : "#1CA1DC",
                color : "white"
            }), 
            singleValue : (provided, state) => ({
                ...provided,
                backgroundColor : "#1CA1DC",
                color : "white"
            }),
            input :  (provided, state) => ({
                ...provided,
                color : "white"
            })
        }}
        options={props.options}
        value={props.value}
    />
)