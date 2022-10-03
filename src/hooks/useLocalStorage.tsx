import { useEffect, useState } from 'react'

const prefix = 'editor-'


console.log(typeof window)
export default function useLocalStorage(key: any, initialValue: any) {
  const prefixedKey = prefix + key

  const [value, setValue] = useState(() => {
    if (typeof window !== 'undefined') {
    const jsonValue = localStorage.getItem(prefixedKey)
    if (jsonValue != null) return JSON.parse(jsonValue)
    }
    if (typeof initialValue === 'function') {
      return initialValue()
    } else {
      return initialValue
    }
  })

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value))
  }, [prefixedKey, value])

  return [value, setValue]
}