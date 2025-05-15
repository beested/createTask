import { Box, Grid, Typography } from '@mui/material'
import { FolderGit2 } from 'lucide-react'

export function InfoContainer() {
  return (
    <Grid
      size={3}
      sx={{
        backgroundColor: '#fafafa',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: 5
      }}
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Olá! Bem-vindo
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        Esse é meu projeto de aprensentação
      </Typography>
      <Box
        sx={{
          mt: 10,
          width: 300,
          height: 300,
          backgroundColor: '#f3f4f6',
          borderRadius: 2,
          boxShadow: 'inset 0 0 10px rgba(0,0,0,0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <FolderGit2 size={60} />
      </Box>
    </Grid>
  )
}
