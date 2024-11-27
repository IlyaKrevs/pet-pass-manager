import React, { FC } from 'react'
import classes from './AddNewItemForm.module.scss'
import { CustomInput } from '../../Components/CustomInput/CustomInput'
import { useCheckBoxInput, useTextInput } from '../../MyFn/customHooks'
import { CustomCheckBox } from '../../Components/CustomCheckBox/CustomCheckBox'
import { CustomBtn } from '../../Components/CustomBtn/CustomBtn'
import { generateRandomPass } from '../../MyFn/generateRandomPass'
import { useAppDispatch, useAppSelector } from '../../redux/reduxHooks'
import { passManagerActions } from '../../redux/slices/passManagerSlice'
import { Spinner } from '../../Components/Spinner/Spinner'
import { error } from 'console'

export const AddNewItemForm = () => {

    const dispatch = useAppDispatch()
    const isLoading = useAppSelector(state => state.passManager.isLoading)
    const isError = useAppSelector(state => state.passManager.error)

    function onSubmitHandler(e: React.FormEvent) {
        e.preventDefault()
    }

    const [login, setLogin, loginValid] = useTextInput('')
    const [pass, setPass, passValid, setGenerate] = useTextInput('')

    const [desiredLength, setDesiredLength, desValid] = useTextInput('5')
    const [useLetters, setUseLetters] = useCheckBoxInput(true)
    const [useDigits, setUseDigits] = useCheckBoxInput()
    const [useSpecialSymbols, setUseSpecialSymbols] = useCheckBoxInput()
    const [useRegister, setUseRegister] = useCheckBoxInput()


    const [useCustomSymbols, setUseCustomSymbols] = useCheckBoxInput()
    const [customSymbols, setCustomSymbols, customValid] = useTextInput('')

    function generateDesiredPass() {
        let result = generateRandomPass(+desiredLength, useLetters, useDigits, useSpecialSymbols, useRegister, useCustomSymbols, customSymbols)

        setGenerate(result)
    }

    function addHandler() {
        if (loginValid && passValid) {
            dispatch(passManagerActions.addLoginPasswordAsync({ login, password: pass }))
        }
    }

    return (
        <form className={classes.mainContainer}
            onSubmit={onSubmitHandler}
        >
            <CustomInput
                labelText='Login :'
                placeholderText='Type your login'
                value={login}
                callback={setLogin}
                isValid={loginValid}
            />
            <CustomInput
                labelText='Password :'
                placeholderText='Type your password'
                value={pass}
                callback={setPass}
                isValid={passValid}
            />

            <div className={classes.generateContainer}>
                <div className={classes.paramsWrapper}>
                    <CustomInput
                        labelText='Desired length'
                        placeholderText='Type your desired length'
                        value={desiredLength}
                        callback={setDesiredLength}
                        isValid={desValid}
                    />

                    <CustomCheckBox
                        labelText='use letters?'
                        value={useLetters}
                        callback={setUseLetters}
                        isDisabled={useCustomSymbols}
                    />

                    <CustomCheckBox
                        labelText='use digits?'
                        value={useDigits}
                        callback={setUseDigits}
                        isDisabled={useCustomSymbols}
                    />
                    <CustomCheckBox
                        labelText='use special symbols?'
                        value={useSpecialSymbols}
                        callback={setUseSpecialSymbols}
                        isDisabled={useCustomSymbols}
                    />
                    <CustomCheckBox
                        labelText='use register?'
                        value={useRegister}
                        callback={setUseRegister}
                        isDisabled={useCustomSymbols}
                    />

                    <CustomCheckBox
                        labelText='use your own symbols?'
                        value={useCustomSymbols}
                        callback={setUseCustomSymbols}
                    />
                    <CustomInput
                        isDisabled={!useCustomSymbols}
                        labelText='Your custom symbols'
                        placeholderText='write your symbols'
                        value={customSymbols}
                        callback={setCustomSymbols}
                        isValid={customValid}
                    />
                </div>
                <CustomBtn
                    colour='first'
                    text='Generate pass'
                    callback={generateDesiredPass}
                    isDisabled={useCustomSymbols && !customValid}
                />
            </div>

            <CustomBtn
                colour='second'
                text='Add new login'
                isDisabled={!loginValid || !passValid}
                callback={addHandler}
            />

            {isLoading && <Spinner />}
            {isError && isError.length > 0 && <div className={classes.errorMsg}>Error : {isError}</div>}
        </form>
    )
}

