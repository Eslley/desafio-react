import { Snackbar } from "@mui/material"
import { createContext, useContext, useMemo, useState } from "react"

const ToastMessageContext = createContext()

export default function ToastMessageProvider({ children }) {

    const [ message, setMessage ] = useState('') 
    const [ open, setOpen ] = useState(false)
    const showToast = (message, duration = 0) => {
        setMessage(message)
        setOpen(true)

        setTimeout(() => {
            setMessage('')
            setOpen(false)
        }, duration === 0 ? 4000 : duration)
    }
    const value = useMemo(
        () => ({ showToast }),
        [showToast]
    )

    return (
        <ToastMessageContext.Provider value={value}>
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={open}
            message={message}
        />
        {children}
    </ToastMessageContext.Provider>
    )
}

export const useToastMessage = () => useContext(ToastMessageContext)