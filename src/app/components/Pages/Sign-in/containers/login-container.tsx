import { loadingAtom } from '@/app/components/loading/loading-atom'
import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography
} from '@mui/material'
import { useSetAtom } from 'jotai'
import Cookies from 'js-cookie'
import { Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { tasksAtom } from '../../Dashboard/atoms'

export function LoginContainer() {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const setLoading = useSetAtom(loadingAtom)
  const setDataTable = useSetAtom(tasksAtom)

  const handleClickShowPassword = () => setShowPassword(!showPassword)

  const handleLogin = () => {
    setLoading(true)

    if (email === 'projeto@lidere.com' && password === '!Lidereprojeto') {
      setError('')

      Cookies.set('token', 'true', { expires: 7 })

      setTimeout(() => {
        router.push('/')
        setLoading(false)
      }, 2000)
    } else {
      setError('Email ou senha inválidos.')
      setLoading(false)
    }

    const now = new Date()

    const newTasks = [
      {
        id: Math.floor(Math.random() * 10000),
        task: 'Enviar relatório semanal',
        status: 'Pendente',
        createdAt: new Date(
          now.getTime() - 2 * 24 * 60 * 60 * 1000
        ).toISOString(),
        priority: 'Baixa'
      },
      {
        id: Math.floor(Math.random() * 10000),
        task: 'Levar o cachorro ao veterinário',
        status: 'Em andamento',
        createdAt: new Date(
          now.getTime() - 3 * 24 * 60 * 60 * 1000
        ).toISOString(),
        priority: 'Média',
        dueDate: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: Math.floor(Math.random() * 10000),
        task: 'Comprar presente para aniversário',
        status: 'Concluída',
        createdAt: new Date(
          now.getTime() - 5 * 24 * 60 * 60 * 1000
        ).toISOString(),
        priority: 'Alta',
        dueDate: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: Math.floor(Math.random() * 10000),
        task: 'Estudar para prova de lógica',
        status: 'Pendente',
        createdAt: new Date(
          now.getTime() - 1 * 24 * 60 * 60 * 1000
        ).toISOString(),
        priority: 'Alta',
        dueDate: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: Math.floor(Math.random() * 10000),
        task: 'Revisar código do projeto',
        status: 'Concluída',
        createdAt: new Date(
          now.getTime() - 4 * 24 * 60 * 60 * 1000
        ).toISOString(),
        priority: 'Baixa',
        dueDate: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: Math.floor(Math.random() * 10000),
        task: 'Revisar código do projeto',
        status: 'Concluída',
        createdAt: new Date(
          now.getTime() - 4 * 24 * 60 * 60 * 1000
        ).toISOString(),
        priority: 'Baixa'
      },
      {
        id: Math.floor(Math.random() * 10000),
        task: 'Comprar presente para aniversário',
        status: 'Concluída',
        createdAt: new Date(
          now.getTime() - 5 * 24 * 60 * 60 * 1000
        ).toISOString(),
        priority: 'Alta',
        dueDate: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: Math.floor(Math.random() * 10000),
        task: 'Comprar presente para aniversário',
        status: 'Concluída',
        createdAt: new Date(
          now.getTime() - 5 * 24 * 60 * 60 * 1000
        ).toISOString(),
        priority: 'Alta',
        dueDate: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]

    setDataTable(prev => {
      const updatedTasks = [...prev, ...newTasks]
      localStorage.setItem('tasks', JSON.stringify(updatedTasks))
      return updatedTasks
    })
  }

  return (
    <Grid
      sx={{
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: 5
      }}
      size={9}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
          px: 5
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 400 }}>
          <Typography
            component="h1"
            variant="h5"
            fontWeight="bold"
            gutterBottom
          >
            Entre na sua conta
          </Typography>

          <Alert severity="info" sx={{ mb: 3 }}>
            Use <strong>projeto@lidere.com</strong> com a senha{' '}
            <strong>!Lidereprojeto</strong>
          </Alert>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <TextField
            fullWidth
            label="Senha"
            variant="outlined"
            margin="normal"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <EyeOff /> : <Eye />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              mt: 1,
              mb: 4,
              fontSize: '0.875rem'
            }}
          >
            <Link href="#" underline="hover">
              Esqueceu a senha?
            </Link>
          </Box>

          <Button
            fullWidth
            variant="contained"
            onClick={handleLogin}
            sx={{
              py: 1.5,
              textTransform: 'none',
              fontWeight: 'bold',
              borderRadius: 3
            }}
          >
            Logar
          </Button>
        </Box>
      </Box>
    </Grid>
  )
}
