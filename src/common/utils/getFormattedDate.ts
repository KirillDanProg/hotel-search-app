type FormatDateType = 'toISOString' | 'toUTCString' | string

export const getFormattedDate = (date: Date | string, format: FormatDateType) => {
    if(typeof date === "string") {
        return new Date(date).toUTCString().slice(0, 16)
    }
    switch (format) {
        case "toISOString":
            return date.toISOString().slice(0, 10)
        case "toUTCString":
            return date.toUTCString().slice(0, 16)
        default:
            return date.toUTCString().slice(0, 16)
    }

}
