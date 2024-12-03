import React, { useEffect, useMemo, useRef, useState } from 'react';

import { useAppDispatch, useAppSelector } from './redux/reduxHooks';
import { passManagerActionsAsync } from './redux/slices/passManagerSlice';
import { saveToClipBoard } from './MyFn/saveToClipboard';
import { InlineInput } from './Components/InlineInput/InlineInput';
import { CellButtonType, ColumnsType, RowType, SimpleTable } from './Containers/SimpleTable/SimpleTable';
import { AddRegular, Copy24Regular, Delete24Filled } from '@fluentui/react-icons';
import { makeStyles, Button, InputProps, Dialog, DialogTrigger, DialogSurface, DialogBody, DialogTitle, DialogContent, DialogActions, Spinner, Toaster, useId, useToastController, Toast, ToastTitle } from '@fluentui/react-components';

import { AddNewModal } from './Containers/AddNewModal/AddNewModal';
import { DeleteModal } from './Containers/DeleteModal/DeleteModal';

type ModalsType = null | 'Add' | 'Delete'

const useStyles = makeStyles({
  root: {
    position: 'relative',
    padding: '200px',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    gap: '50px'
  },
  controlPanel: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '50px',
  },
  tableContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  spinnerContainer: {
    position: 'absolute',
    zIndex: 1e10,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backdropFilter: 'blur(5px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

function App() {

  const isLoading = useAppSelector(s => s.passManager.isLoading)

  const styles = useStyles()

  const serviceItems = useAppSelector(state => state.passManager.loginItems)

  const columns: ColumnsType[] = useMemo(() => [
    { columnKey: 'login', label: 'Login' },
    { columnKey: 'password', label: 'Password' },
  ], [])

  const rows: RowType[] = useMemo(() => {
    return serviceItems.map(item => {
      return {
        id: item.id + '',
        cells: [{ label: item.login }, { label: item.password }]
      }
    })
  }, [serviceItems])

  const buttons: CellButtonType[] = useMemo(() => {
    return [
      {
        label: <Copy24Regular />,
        callback: (row, index) => {
          let toCopy = row.cells[index].label
          alert(`Copied => ${toCopy}`)
          saveToClipBoard(toCopy)
        }
      },
      {
        label: <Delete24Filled />,
        callback: (row, index) => {
          setDeleteID(+row.id)
          openModalHadnler('Delete')
        }
      },
    ]
  }, [])

  const [deleteID, setDeleteID] = useState<number | null>(null)

  const [textInput, setTextInput] = useState('')
  const [search, setSearch] = useState('')
  const timerRef = useRef<NodeJS.Timeout>()

  const textInputHandle = (value: string) => {
    setTextInput(value)
    clearTimeout(timerRef.current)

    timerRef.current = setTimeout(() => {
      setSearch(value)
    }, 400);
  }

  const showRows = rows.filter(item => item.cells[0].label.includes(search))





  const [modalType, setModalType] = useState<ModalsType>(null)
  const openModalHadnler = (value: Exclude<ModalsType, null>) => setModalType(value)
  const closeModalHandler = () => {
    setDeleteID(null)
    setModalType(null)
  }


  const toastID = useId('toaster')
  const { dispatchToast } = useToastController(toastID)
  const error = useAppSelector(s => s.passManager.error)

  const notifyToast = (status: 'success' | 'error') => {
    dispatchToast(
      <Toast>
        <ToastTitle>{status === 'success' ? 'All fine!' : 'Something was wrong, try again!'}</ToastTitle>
      </Toast>,
      { intent: status }
    )
  }

  useEffect(() => {
    if (isLoading === 'done') {
      notifyToast(error ? 'error' : 'success')
    }
  }, [isLoading])

  return (
    <div className={styles.root}>

      <div className={styles.controlPanel}>
        <InlineInput
          value={textInput}
          onChange={textInputHandle}
          label='Find login:'
        />

        <Button
          onClick={() => openModalHadnler('Add')}
          icon={<AddRegular />}
          iconPosition='after'
          appearance='primary'
        >
          ADD NEW
        </Button>

      </div>
      <div className={styles.tableContainer}>
        <SimpleTable
          columns={columns}
          rows={showRows}
          buttons={buttons}
        />
      </div>


      {modalType === 'Add' ?
        < AddNewModal isOpen={true} onCloseModal={closeModalHandler} />
        : modalType === 'Delete' ?
          <DeleteModal isOpen={true} onCloseModal={closeModalHandler} deleteID={deleteID!} />
          : null
      }



      {isLoading === 'inProgress' &&
        <div className={styles.spinnerContainer}>
          <Spinner size='huge' />
        </div>
      }

      <Toaster toasterId={toastID} />
    </div>
  );
}

export default App;
