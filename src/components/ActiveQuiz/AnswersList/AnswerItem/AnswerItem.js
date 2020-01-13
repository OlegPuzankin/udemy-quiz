import React from 'react'
import classes from './AnswerItem.module.css'
import cn from 'classnames'

const AnswerItem = props => {

    //console.log('answerItem_state', props.state);

    return (
        <li
            //className={cls.join(' ')}
            className={cn({[classes.AnswerItem]:true, [classes[props.state]]: props.state})}
            onClick={() => props.onAnswerClick(props.answer.id)}
        >
            {props.answer.text}
        </li>
    )
};

export default AnswerItem