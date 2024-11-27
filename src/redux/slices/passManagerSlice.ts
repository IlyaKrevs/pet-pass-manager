import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { saveToLocalStorage, getFromLocalStorage } from "../../MyFn/localStoragefn";

export interface ILoginItem {
    id: number,
    login: string,
    password: string
}

interface IPassManagerState {
    loginItems: ILoginItem[],
    isLoading: boolean,
    error: null | string
}

const example: ILoginItem[] = [
    { id: 1, login: 'nastya', password: '123' },
    { id: 2, login: 'sasha', password: '345' },
    { id: 3, login: 'masha', password: '678' },
]

const initialState: IPassManagerState = {
    loginItems: getFromLocalStorage('loginItems') || example,
    isLoading: false,
    error: null,
}


const addLoginPasswordAsync = createAsyncThunk(
    'passManager/addNew',
    async (data: Omit<ILoginItem, 'id'>) => {
        const response = await new Promise<boolean>((res) => {
            setTimeout(() => {
                res(Math.random() > 0.5)
            }, 1000);
        })
        if (!response) {
            throw new Error('Mistake! Try again!')
        }

        return data
    }
)

const deleteLoginPassAsync = createAsyncThunk(
    'passManager/delete',
    async (data: Pick<ILoginItem, 'id'>) => {
        const response = await new Promise<boolean>((res) => {
            setTimeout(() => {
                res(Math.random() > 0.5)
            }, 1000);
        })
        if (!response) {
            throw new Error('Mistake! Try again!')
        }

        return data
    }
)

const passManagerSlice = createSlice({
    name: 'passManager',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(addLoginPasswordAsync.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(addLoginPasswordAsync.fulfilled, (state, action) => {
                state.isLoading = false

                const newItem: ILoginItem = {
                    id: Date.now(),
                    login: action.payload.login,
                    password: action.payload.password
                }
                state.loginItems.push(newItem)
                saveToLocalStorage('loginItems', state.loginItems)
            })
            .addCase(addLoginPasswordAsync.rejected, (state, action) => {
                state.isLoading = false

                state.error = action.error.message || 'never'
            })
            .addCase(deleteLoginPassAsync.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(deleteLoginPassAsync.fulfilled, (state, action) => {
                state.isLoading = false

                const newState = state.loginItems.filter(item => item.id !== action.payload.id)
                state.loginItems = newState

                if (newState.length === 0) {
                    localStorage.clear()
                } else {
                    saveToLocalStorage('loginItems', newState)
                }
            })
            .addCase(deleteLoginPassAsync.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message || 'never'
            })

    }
})

const passManagerActions = { addLoginPasswordAsync, deleteLoginPassAsync }

export { passManagerActions }
export default passManagerSlice.reducer
