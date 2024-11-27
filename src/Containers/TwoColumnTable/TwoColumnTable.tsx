import React, { FC, ReactNode } from 'react'
import classes from './TwoColumnTable.module.scss'
import { CustomBtn } from '../../Components/CustomBtn/CustomBtn'
import { ILoginItem } from '../../redux/slices/passManagerSlice'
import { TableRow } from '../../Components/TableRow/TableRow'

interface IProps {
    titleText: string,
    firstColumnText: string,
    secondColumnText: string,
    content: ReactNode
}


export const TwoColumnTable: FC<IProps> = ({ titleText, firstColumnText, secondColumnText, content }) => {
    return (
        <div className={classes.mainContainer}>
            <div className={classes.title}>
                {titleText}
            </div>

            <div className={classes.tableContainer}>

                <TableRow leftColumn={firstColumnText} rightColumn={secondColumnText} isFirst  />

                {content}

            </div>
        </div>
    )
}

