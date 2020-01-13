import classes from "./RenderSelect.module.scss";
import React from "react";


const renderOptions = (options) => {
    return options.map((option, index) => {
        return <option key={index}
                       value={option}>{option}
        </option>
    })
};

export const RenderSelect = (props) => {
    console.log(props)
    const htmlFor = `${props.label}-${Math.random()}`;
    return (
        <div className={classes.RenderSelect}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <div>
                <select {...props.input} id={htmlFor}>
                    <option>{props.label}</option>
                    {
                        renderOptions(props.options)
                    }
                </select>
            </div>
        </div>

    );
};


