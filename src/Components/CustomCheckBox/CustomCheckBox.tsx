import React, { FC, useId } from 'react'
import classes from './CustomCheckBox.module.scss'

interface IProps {
    labelText: string,
    value: boolean,
    callback: (e: React.ChangeEvent<HTMLInputElement>) => void,
    isDisabled?: boolean,
}

export const CustomCheckBox: FC<IProps> = ({ labelText, value, callback, isDisabled }) => {

    const id = useId()

    return (
        <div className={classes.mainContainer}>
            <input
                type="checkbox"
                id={id}
                checked={value}
                onChange={callback}
                disabled={isDisabled}
            />
            <label htmlFor={id}>
                {labelText}
            </label>
        </div>
    )
}


