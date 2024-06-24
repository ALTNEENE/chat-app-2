export const extractDate = (dateString) => {
    const date = new Date(dateString)
    const hours = padZeros(date.getHours())
    const minuts = padZeros(date.getMinutes())

    return `${hours}:${minuts}`
}

const padZeros = (number) => {
    return number.toString().padStart(2, "0")
}