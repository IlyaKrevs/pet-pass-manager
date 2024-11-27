import { configureStore } from "@reduxjs/toolkit";
import * as redusers from './exports'


const reduxStore = configureStore({
    reducer: {
        ...redusers
    }
})



export { reduxStore }