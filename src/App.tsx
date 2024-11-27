import React from 'react';

import classes from './App.module.scss'
import { CustomBtn } from './Components/CustomBtn/CustomBtn';
import { TwoColumnTable } from './Containers/TwoColumnTable/TwoColumnTable';
import { useAppDispatch, useAppSelector } from './redux/reduxHooks';
import { TableRow } from './Components/TableRow/TableRow';
import { passManagerActions } from './redux/slices/passManagerSlice';
import { saveToClipBoard } from './MyFn/saveToClipboard';
import { ModalWindowWithContent } from './Containers/ModalWindowWithContent/ModalWindowWithContent';
import { modalActions } from './redux/slices/modalSlice';
import { Spinner } from './Components/Spinner/Spinner';
import { CustomInput } from './Components/CustomInput/CustomInput';
import { useTextInput } from './MyFn/customHooks';

function App() {

  const items = useAppSelector(state => state.passManager.loginItems)
  const modalStatus = useAppSelector(state => state.modalWindow.windowType)
  const isLoading = useAppSelector(state => state.passManager.isLoading)
  const isError = useAppSelector(state => state.passManager.error)
  const dispatch = useAppDispatch()


  function deleteCallback(value: number) {
    dispatch(passManagerActions.deleteLoginPassAsync({ id: value }))
  }

  function savetoClipBoardCallback(value: string) {
    saveToClipBoard(value)
    alert(`Copied! => ${value}`)
  }



  const [search, setSearch] = useTextInput('')

  function openAddModal() {
    dispatch(modalActions.openModal({ windowType: 'addModal' }))
  }

  let showItems;

  if (search.length > 0) {
    showItems = items.filter(item => item.login.includes(search))
  } else {
    showItems = items
  }

  const tableRows = showItems.map(item => {
    return <TableRow
      key={item.id}
      leftColumn={<>{item.login} <CustomBtn colour='third' text='Detete' callback={() => deleteCallback(item.id)} /></>}
      rightColumn={<>{item.password} <CustomBtn colour='first' text='Copy' callback={() => savetoClipBoardCallback(item.password)} /></>}
    />
  })

  return (
    <div className={classes.mainContainer}>

      <div className={classes.controlPanel}>
        <CustomInput
          labelText='Search login...'
          placeholderText='type here login'
          isValid={true}
          value={search}
          callback={setSearch}
        />

        <CustomBtn
          colour='second'
          text='Add new login/pass'
          callback={openAddModal}
        />
      </div>

      <TwoColumnTable
        titleText='Pass-Manager'
        firstColumnText='Login:'
        secondColumnText='Password:'
        content={tableRows}
      />


      {modalStatus !== null && <ModalWindowWithContent windowType={modalStatus} />}
      {modalStatus === null && isLoading && <Spinner />}
      {modalStatus === null && isError && isError.length > 0 &&
        <div className={classes.errorMsg}>Error : {isError}</div>}
    </div>
  );
}

export default App;



