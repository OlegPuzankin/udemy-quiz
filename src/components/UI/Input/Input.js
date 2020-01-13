import React from 'react'
import classes from './Input.module.scss'
import cn from 'classnames'


const isInvalid = ({valid, touched, shouldValidate })=>{
    return !valid && touched && shouldValidate
};

export const Input = (props) => {
    //console.log('Input', props)
    const inputType = props.type || 'text';
    const htmlFor = `${inputType}-${Math.random()}`;

    return (
        <div className={cn({[classes.Input]:true, [classes.invalid]: isInvalid(props)})}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input type={inputType}
                   id={htmlFor}
                   value={props.value}
                   onChange={props.onChange}/>
            {isInvalid(props)&&<span>{props.errorMessage}</span>}
        </div>
    );
};