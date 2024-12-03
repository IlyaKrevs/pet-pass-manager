import { DialogBody, DialogTitle, DialogContent, DialogActions, Button, makeStyles, Checkbox, CheckboxProps, Input, InputProps, Spinner, DialogSurface, Dialog } from '@fluentui/react-components'
import React, { FC, useState } from 'react'

import { InlineInput } from '../../Components/InlineInput/InlineInput'
import { generateRandomPass } from '../../MyFn/generateRandomPass'
import { useAppDispatch } from '../../redux/reduxHooks'
import { passManagerActionsAsync } from '../../redux/slices/passManagerSlice'

interface IProps {
    isOpen: boolean,
    onCloseModal: () => void,
}

const useStyles = makeStyles({
    formWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px'
    },
    formContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%'
    },
    inputsWrapper: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
})


type NewService = {
    login: string,
    password: string,
}

type GenerateParams = {
    include_letters: boolean,
    include_digits: boolean,
    include_special_symbols: boolean,
    include_register: boolean,
}


export const AddNewModal: FC<IProps> = ({ isOpen, onCloseModal }) => {

    const styles = useStyles()

    const [newService, setNewService] = useState<NewService>({ login: '', password: '' })

    const setNewServiceHandler = (key: keyof NewService, value: string) => {
        setNewService(prev => ({ ...prev, [key]: value }))
    }

    const [desiredLength, setDesiredLength] = useState<string>('5')
    const setLengthHadnler = (value: string) => setDesiredLength(value)

    const [params, setParams] = useState<GenerateParams>({
        include_letters: false,
        include_digits: false,
        include_special_symbols: false,
        include_register: false,
    })
    const setParamsHadnler: CheckboxProps['onChange'] = (e, data) => {
        setParams(prev => ({ ...prev, [e.target.name]: data.checked }))
    }

    const [includeCustom, setIncludeCustom] = useState<boolean>(false)
    const setCustomHandler: CheckboxProps['onChange'] = (e, data) => setIncludeCustom(!!data.checked)

    const [customSymbols, setCustomSymbols] = useState<string>('')
    const setCustomSymbolsHandler: InputProps['onChange'] = (e, data) => setCustomSymbols(data.value)

    const generateHandler = () => {
        setNewService(prev => (
            {
                ...prev,
                password: generateRandomPass(
                    +desiredLength,
                    params.include_letters,
                    params.include_digits,
                    params.include_special_symbols,
                    params.include_register,
                    includeCustom,
                    customSymbols
                )
            }))
    }

    const dispatch = useAppDispatch()
    const onSubmitHandler = () => {
        if (!newService.login.length || !newService.password.length) {
            return
        }
        dispatch(passManagerActionsAsync.addLoginPasswordAsync({ ...newService }))
    }


    return (
        <Dialog open={isOpen}>
            <DialogSurface>
                <DialogBody>
                    <DialogTitle>
                        Create new service
                    </DialogTitle>
                    <DialogContent>
                        <div className={styles.formWrapper}>

                            <form className={styles.formContainer}>
                                <div className={styles.inputsWrapper}>

                                    {Object.keys(newService).map(key => {
                                        const serviceKey = key as keyof NewService
                                        return <InlineInput
                                            key={serviceKey}
                                            value={newService[serviceKey]}
                                            onChange={(newValue) => setNewServiceHandler(serviceKey, newValue)}
                                            label={`${serviceKey[0].toUpperCase() + serviceKey.slice(1)}:`}
                                        />
                                    })}
                                </div>
                            </form>

                            <div>
                                <InlineInput
                                    value={desiredLength}
                                    onChange={setLengthHadnler}
                                    label='Desired length:'
                                />
                                {Object.keys(params).map(key => {
                                    const paramKey = key as keyof GenerateParams
                                    let newLabel = paramKey.replace(/_/g, ' ')
                                    newLabel = newLabel[0].toUpperCase() + newLabel.slice(1)
                                    return <Checkbox
                                        key={paramKey}
                                        name={paramKey}
                                        checked={params[paramKey]}
                                        onChange={setParamsHadnler}
                                        label={newLabel}
                                        disabled={includeCustom}
                                    />
                                })}
                                <div >

                                    <Checkbox
                                        checked={includeCustom}
                                        onChange={setCustomHandler}
                                        label={'Use this symbols for generate =>'}
                                    />
                                    <Input
                                        value={customSymbols}
                                        onChange={setCustomSymbolsHandler}
                                        disabled={!includeCustom}
                                    />
                                </div>
                            </div>


                        </div>
                    </DialogContent>
                    <DialogActions  >

                        <Button
                            onClick={onCloseModal}
                        >
                            Close
                        </Button>
                        <Button onClick={generateHandler}>
                            Generate new pass
                        </Button>
                        <Button appearance='primary' onClick={onSubmitHandler} >
                            Make new service
                        </Button>
                    </DialogActions>
                </DialogBody>

            </DialogSurface>
        </Dialog >
    )
}

