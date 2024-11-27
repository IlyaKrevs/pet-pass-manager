import { reduxStore } from "./redux";
import { useDispatch, useSelector } from "react-redux";


type RootState = ReturnType<typeof reduxStore.getState>
type AppDispatch = typeof reduxStore.dispatch


const useAppDispatch = useDispatch.withTypes<AppDispatch>()
const useAppSelector = useSelector.withTypes<RootState>()


export { useAppDispatch, useAppSelector }