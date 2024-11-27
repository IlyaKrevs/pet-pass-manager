import React, { FC, ReactNode } from 'react'
import classes from './TableRow.module.scss'

interface IProps {
    leftColumn: ReactNode,
    rightColumn: ReactNode,
    isFirst?: boolean
}

export const TableRow: FC<IProps> = ({ leftColumn, rightColumn, isFirst }) => {

    const resultStyle = [classes.tableContainer__row__inner]

    isFirst && resultStyle.push(classes.isFirst)

    return (
        <div className={classes.tableContainer__row}>

            <div className={resultStyle.join(' ')}>
                {leftColumn}

            </div>
            <div className={resultStyle.join(' ')}>
                {rightColumn}

            </div>

        </div>
    )
}


