import { useState } from "react";

type ChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => void

type TextTuple = [string, ChangeEvent, boolean | null, (value: string) => void]

export function useTextInput(initValue: string): TextTuple {
    const [value, setValue] = useState(initValue)
    const [valid, setIsValid] = useState<boolean | null>(null)

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        setIsValid(+e.target.value.length > 0)
        setValue(e.target.value)
    }

    function setHandler(value: string) {
        setValue(value)
        setIsValid(+value.length > 0)
    }

    return [value, onChange, valid, setHandler]
}

type CheckBoxTuple = [boolean, ChangeEvent]

export function useCheckBoxInput(init?: boolean): CheckBoxTuple {
    const [value, setValue] = useState(init || false)

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        setValue(e.target.checked)
    }

    return [value, onChange]
}

