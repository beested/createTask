'use client'

import { Alert, AlertColor, Snackbar } from '@mui/material'
import React, { createContext, useCallback, useContext, useState } from 'react'

type SnackbarContextType = {
  showMessage: (message: string, severity?: AlertColor) => void
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
)

export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext)
  if (!context) {
    throw new Error('useSnackbar deve ser usado dentro de SnackbarProvider')
  }
  return context
}

export const SnackbarProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState<AlertColor>('info')

  const showMessage = useCallback(
    (msg: string, severity: AlertColor = 'info') => {
      setMessage(msg)
      setSeverity(severity)
      setOpen(true)
    },
    []
  )

  const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return
    setOpen(false)
  }

  return (
    <SnackbarContext.Provider value={{ showMessage }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  )
}
