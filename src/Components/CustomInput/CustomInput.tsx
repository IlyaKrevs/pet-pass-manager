import React, { FC, useId } from 'react'
import classes from './CustomInput.module.scss'

interface IProps {
    labelText: string,
    placeholderText: string,
    value: string,
    callback: (e: React.ChangeEvent<HTMLInputElement>) => void,
    isValid: boolean | null,
    isDisabled?: boolean,
}


export const CustomInput: FC<IProps> = ({ labelText, placeholderText, value, callback, isValid, isDisabled }) => {

    const id = useId()

    const resultStyle = [classes.customInput]

    if (!isDisabled && isValid !== null) {
        if (isValid) {
            resultStyle.push(classes.valid)
        } else {
            resultStyle.push(classes.inValid)
        }
    }

    return (
        <div className={classes.mainContainer}>
            <label htmlFor={id}>
                {labelText}
            </label>
            <input
                type="text"
                className={resultStyle.join(' ')}
                placeholder={placeholderText}
                value={value}
                onChange={callback}
                disabled={isDisabled}
            />
        </div>
    )
}


