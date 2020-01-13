import React from 'react'
import classes from './RenderField.module.scss'
import cn from 'classnames'

export const RenderField = (props) => {
    let {input, label, type, meta: {touched, error, warning}} = props;
    let hasError = touched && error;
    const htmlFor = `${props.label}-${Math.random()}`;
    //debugger
    return (
        <div className={cn({[classes.Input]:true, [classes.invalid]: hasError})}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input {...input} type={type} placeholder={label} id={htmlFor}/>
            <div>
                {touched &&
                ((error && <span>{error}</span>) ||
                    (warning && <span>{warning}</span>))}

                {/*{hasError && (error && <span>{error}</span>) || (warning && <span>{warning}</span>)}*/}
            </div>
        </div>

    )

};