import React, { FC } from 'react'
import classes from './CustomBtn.module.scss'


interface IProps {
    colour: 'first' | 'second' | 'third',
    text: string,
    callback: () => void,
    isDisabled?: boolean,
}


const coloursObj: { [key in IProps['colour']]: string } = {
    first: classes.colourFirst,
    second: classes.colourSecond,
    third: classes.colourThird
}

export const CustomBtn: FC<IProps> = ({ colour, text, callback, isDisabled }) => {

    const resultStyles = [classes.mainContainer]
    resultStyles.push(coloursObj[colour])

    return (
        <button className={resultStyles.join(' ')}
            onClick={callback}
            disabled={isDisabled}
        >
            {text}
        </button>
    )
}


