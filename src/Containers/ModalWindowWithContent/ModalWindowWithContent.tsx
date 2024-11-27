import React, { FC } from 'react'
import classes from './ModalWindowWithContent.module.scss'
import { IModal } from '../../redux/slices/modalSlice'
import { ModalWindow } from '../../Components/ModalWindow/ModalWindow'
import { CustomInput } from '../../Components/CustomInput/CustomInput'
import { AddNewItemForm } from '../AddNewItemForm/AddNewItemForm'



export const ModalWindowWithContent: FC<IModal> = ({ windowType }) => {
    return (
        <>
            {windowType === 'addModal' &&
                <ModalWindow>
                    <AddNewItemForm />
                </ModalWindow >

            }

        </>
    )
}

