import React from 'react'
import classes from './Button.module.css'
import cn from 'classnames'

const Button = props => {


  return (
    <button
      onClick={props.onClick}
      className={cn({[classes.Button]:true, [classes[props.type]]:true})}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}

export default Button