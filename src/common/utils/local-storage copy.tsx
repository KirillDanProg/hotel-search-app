export const saveToLocalStorage = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.log(e)
  }
}

export const getFromLocalStorage = (key: string) => {
  try {
    const storedValue = localStorage.getItem(key)

    if (storedValue) {
      return JSON.parse(storedValue)
    }

  } catch (e) {
    console.log(e)
    return undefined
  }
}

export const removeFromLocalStorage =  (key: string) => {
  try {
    localStorage.removeItem(key)
  } catch (e) {
    console.log(e)
  }
}