import { Alert, Snackbar } from '@mui/material'
import { useAtom } from 'jotai'
import { snackbarAtom } from '../Pages/Dashboard/atoms'

export const SnackbarStale = () => {
  const [snackbarState, setSnackbar] = useAtom(snackbarAtom)

  return (
    <Snackbar
      open={snackbarState.open}
      autoHideDuration={6000}
      onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
    >
      <Alert
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        severity={snackbarState.severity}
        sx={{ width: '100%' }}
      >
        {snackbarState.message}
      </Alert>
    </Snackbar>
  )
}
