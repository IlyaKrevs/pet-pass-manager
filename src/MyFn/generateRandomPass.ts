function generateRandomPass(
    length: number,
    useLetters: boolean,
    useDigits: boolean,
    useSpecial: boolean,
    useRegister: boolean,
    useCustomSymbols: boolean,
    customSymbols: string
): string {
    const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const upperCaseLetters = lowerCaseLetters.toUpperCase();
    const digits = '0123456789';
    const special = '!@#$%^&*()_+[]{}|;:,.<>?';

    if (!useLetters && !useDigits && !useSpecial && !useCustomSymbols) {
        return ''
    }

    let usedSymbols = ''

    if (useCustomSymbols) {
        usedSymbols = customSymbols
    } else {
        if (useLetters) {
            usedSymbols += useRegister ? (lowerCaseLetters + upperCaseLetters) : lowerCaseLetters
        }
        if (useDigits) {
            usedSymbols += digits
        }
        if (useSpecial) {
            usedSymbols += special
        }
    }

    if (usedSymbols.length === 0) {
        return ''
    }

    let result = ''

    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * usedSymbols.length)
        result += usedSymbols[randomIndex]
    }

    return result
}

export { generateRandomPass }