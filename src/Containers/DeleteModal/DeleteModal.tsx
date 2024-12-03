import { Button, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, } from '@fluentui/react-components'
import React, { FC } from 'react'

import { useAppDispatch } from '../../redux/reduxHooks'
import { passManagerActionsAsync } from '../../redux/slices/passManagerSlice'


interface IProps {
    isOpen: boolean,
    onCloseModal: () => void,
    deleteID: number,
}

export const DeleteModal: FC<IProps> = ({ isOpen, onCloseModal, deleteID }) => {

    const dispatch = useAppDispatch()


    const deleteHandler = () => {
        dispatch(passManagerActionsAsync.deleteLoginPassAsync({ id: deleteID }))
        onCloseModal()
    }

    return (

        <Dialog open={isOpen}>
            <DialogSurface>
                <DialogBody>
                    <DialogTitle>
                        Do you wanna delete this sevice?
                    </DialogTitle>
                    <DialogContent>

                    </DialogContent>
                    <DialogActions  >

                        <Button
                            onClick={onCloseModal}
                        >
                            Close
                        </Button>

                        <Button appearance='primary' onClick={deleteHandler} >
                            Delete
                        </Button>
                    </DialogActions>
                </DialogBody>

            </DialogSurface>
        </Dialog >


    )
}
