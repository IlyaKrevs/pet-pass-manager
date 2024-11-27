import React, { FC, ReactNode, useEffect, useRef } from 'react'
import classes from './ModalWindow.module.scss'
import { useAppDispatch } from '../../redux/reduxHooks'
import { modalActions } from '../../redux/slices/modalSlice'

interface IProps {
    children: ReactNode
}

export const ModalWindow: FC<IProps> = ({ children }) => {

    const myRef = useRef<HTMLDivElement | null>(null)

    const dispatch = useAppDispatch()

    useEffect(() => {
        const clickOutsideHandler = (e: MouseEvent) => {
            if (myRef.current && !myRef.current.contains(e.target as Node)) {
                dispatch(modalActions.closeModal())
            }
        }

        document.addEventListener('mousedown', clickOutsideHandler)
        return () => document.removeEventListener('mousedown', clickOutsideHandler)

    }, [])

    return (
        <div className={classes.wrapper}>
            <div className={classes.mainContainer}
                ref={myRef}
            >
                {children}
            </div>
        </div>
    )
}

