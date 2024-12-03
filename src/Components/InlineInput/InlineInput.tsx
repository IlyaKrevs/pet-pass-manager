import React, { FC } from 'react'
import { Input, InputProps, Label, makeStyles, useId } from '@fluentui/react-components'

interface IProps {
    value: string,
    onChange: (value: string) => void,
    label: string,
}

const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '5px',
        minWidth: '300px',
    }
})

export const InlineInput: FC<IProps> = ({ value, onChange, label }) => {
    const styles = useStyles()

    const inputID = useId('input')

    const onChangeHandler: InputProps['onChange'] = (e, data) => {
        onChange(data.value)
    }

    return (
        <div className={styles.root}>
            <Label
                htmlFor={inputID}
            >
                {label}
            </Label>
            <Input
                id={inputID}
                value={value}
                onChange={onChangeHandler}
            />
        </div>
    )
}
