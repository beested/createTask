import { Box, Typography } from '@mui/material'
import { Dot } from 'lucide-react'

export function FormLoading() {
  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'rgba(0, 0, 0, 0.8)',
        pointerEvents: 'painted'
      }}
    >
      <Typography
        variant="h6"
        sx={{ color: '#fff', fontWeight: 500, letterSpacing: '0.05em' }}
      >
        Processando
      </Typography>

      <Box
        sx={{
          display: 'flex',
          gap: 1,
          mt: 1,
          color: '#fff',
          pointerEvents: 'none'
        }}
      >
        <Dot className="animate-bounce delay-0" />
        <Dot className="animate-bounce delay-150" />
        <Dot className="animate-bounce delay-300" />
        <Dot className="animate-bounce delay-150" />
        <Dot className="animate-bounce delay-300" />
      </Box>
    </Box>
  )
}
