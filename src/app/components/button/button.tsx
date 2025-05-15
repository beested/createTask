import { Button as MuiButton } from '@mui/material'

interface CustomButtonProps {
  text: string
  onClick?: () => void
  icon?: React.ReactNode
  variant?: 'contained' | 'outlined' | 'text'
  color:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning'
  size?: 'small' | 'medium' | 'large'
  type?: 'button' | 'submit' | 'reset'
  [key: string]: any
}

export function ButtonStale({
  text,
  onClick,
  icon,
  variant,
  color,
  size,
  type,
  ...props
}: CustomButtonProps) {
  return (
    <MuiButton
      variant={variant ?? 'contained'}
      color={color}
      type={type ?? 'button'}
      size={size ?? 'medium'}
      onClick={onClick}
      sx={{
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        textTransform: 'none'
      }}
      {...props}
    >
      {icon}
      {text}
    </MuiButton>
  )
}
