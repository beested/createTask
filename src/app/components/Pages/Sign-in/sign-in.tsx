'use client'

import { Grid } from '@mui/material'
import { useAtom } from 'jotai'
import { FormLoading } from '../../loading/loading'
import { loadingAtom } from '../../loading/loading-atom'
import { InfoContainer } from './containers/info-container'
import { LoginContainer } from './containers/login-container'

export default function SignIn() {
  const [loading] = useAtom(loadingAtom)

  if (loading) return <FormLoading />
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <InfoContainer />
      <LoginContainer />
    </Grid>
  )
}
