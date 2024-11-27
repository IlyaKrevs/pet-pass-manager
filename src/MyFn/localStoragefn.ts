import { ILoginItem } from "../redux/slices/passManagerSlice";

interface ILocalStorage {
    loginItems: ILoginItem[]
}

type LocalStorageKeys = keyof ILocalStorage

function saveToLocalStorage<T extends LocalStorageKeys, K extends ILocalStorage[T]>(key: T, value: K): void {
    localStorage.setItem(key, JSON.stringify(value))
}

function getFromLocalStorage<T extends LocalStorageKeys, K extends ILocalStorage[T]>(key: T): K | null {
    const result = localStorage.getItem(key)
    if (result) {
        return JSON.parse(result)
    } else {
        return null
    }
}


export { saveToLocalStorage, getFromLocalStorage }