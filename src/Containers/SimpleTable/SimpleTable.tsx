import { Button, makeStyles, Table, TableBody, TableCell, TableCellLayout, TableHeader, TableHeaderCell, TableRow } from '@fluentui/react-components'
import React, { FC } from 'react'



interface IProps {
    columns: ColumnsType[],
    rows: RowType[],
    buttons: CellButtonType[]
}


export type ColumnsType = {
    columnKey: string,
    label: string,
}

type CellType = {
    label: string
}

export type RowType = {
    id: string,
    cells: CellType[]
}

export type CellButtonType = {
    label: JSX.Element,
    callback: (row: RowType, index: number) => void
} | null

const useStyles = makeStyles({
    cellContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        minWidth: '200px',
    }
})


export const SimpleTable: FC<IProps> = ({ columns, rows, buttons }) => {

    const styles = useStyles()

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        {columns.map(item => {
                            return <TableHeaderCell key={item.columnKey}>
                                {item.label}
                            </TableHeaderCell>
                        })}
                    </TableRow>
                </TableHeader>
            
                <TableBody>
                    {rows.length > 0 ? (
                        rows.map(row => {
                            return <TableRow key={row.id} >
                                {row.cells.map((item, index) => {
                                    return <TableCell key={item.label}>
                                        <TableCellLayout >

                                            <div className={styles.cellContainer}>
                                                {item.label}

                                                {buttons[index] !== null &&
                                                    <Button
                                                        onClick={() => buttons[index]?.callback(row, index)}
                                                    >
                                                        {buttons[index]?.label}
                                                    </Button>}

                                            </div>

                                        </TableCellLayout>
                                    </TableCell>
                                })}


                            </TableRow>

                        })
                    ) : (
                        <TableRow>
                            <TableCell>
                                <TableCellLayout>
                                    Nothing...
                                </TableCellLayout>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table >
        </>
    )
}
