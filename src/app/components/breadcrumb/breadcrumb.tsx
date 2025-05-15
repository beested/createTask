import { useColorMode } from '@/context/theme-context'
import {
  Box,
  Breadcrumbs,
  Button,
  Link,
  Stack,
  Typography
} from '@mui/material'
import { Moon, Sun } from 'lucide-react'

interface BreadcrumbProps {
  title: string
  link: string
  subLink: string
}

export function Breadcrumb({ title, link, subLink }: BreadcrumbProps) {
  const { toggleColorMode, mode } = useColorMode()

  return (
    <Box>
      <Stack
        direction="row"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Typography variant="h4" gutterBottom>
          {title} Lista de Tarefas
        </Typography>
        <Button
          variant="text"
          onClick={toggleColorMode}
          sx={{
            height: 'full',
            mb: 1
          }}
        >
          {mode === 'dark' ? <Sun /> : <Moon />}
        </Button>
      </Stack>

      <Breadcrumbs separator="•" aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Typography color="text.primary">{link}</Typography>
        <Typography color="text.primary">{subLink}</Typography>
      </Breadcrumbs>
    </Box>
  )
}
