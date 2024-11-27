import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface IModal {
    windowType: null | 'addModal'
}

const initialState: IModal = {
    windowType: null
}

const modalSlice = createSlice({
    name: 'modalWindow',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<IModal>) => {
            state.windowType = action.payload.windowType
        },
        closeModal: (state) => {
            state.windowType = null
        }
    }
})

const modalActions = modalSlice.actions

export { modalActions }
export default modalSlice.reducer
