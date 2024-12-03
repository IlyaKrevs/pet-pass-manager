import { useState } from "react";

type onChangeText = (value: string) => void
type TextTuple = [string, onChangeText, boolean | null]

type validFn = () => boolean

export function useTextInput(initValue: string, isValidFn: validFn): TextTuple {
    const [value, setValue] = useState(initValue)
    const [valid, setIsValid] = useState<boolean | null>(null)

    function onChange(value: string) {
        setIsValid(isValidFn())
        setValue(value)
    }

    return [value, onChange, valid]
}


type onChangeCheckBox = (value: boolean) => void
type CheckBoxTuple = [boolean, onChangeCheckBox]

export function useCheckBoxInput(): CheckBoxTuple {
    const [value, setValue] = useState(false)

    function onChange(value: boolean) {
        setValue(value)
    }

    return [value, onChange]
}

