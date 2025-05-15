// theme/light-theme.ts
import { createTheme } from '@mui/material/styles'

export const lightTheme = createTheme({
  palette: {
    mode: 'light'
  },
  typography: {
    fontFamily: 'var(--font-poppins), sans-serif'
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px' // Bordas arredondadas para TextFields
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderRadius: '12px' // Bordas arredondadas para o contorno
          }
        }
      }
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          backgroundColor: '#f5f5f5',
          borderBottom: '1px solid #e0e0e0'
        }
      }
    }
  }
})
