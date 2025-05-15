import { Box } from '@mui/material'
import { alpha } from '@mui/material/styles'

interface iconStyle {
  icon: React.ReactNode
  iconColor?: string
  opacityOuter?: number
  opacityInner?: number
}

export const IconStyle = ({
  iconColor = '#FF0000',
  opacityOuter = 0.2,
  opacityInner = 0.4,
  icon
}: iconStyle) => {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: alpha(iconColor, opacityOuter),
        borderRadius: '8px'
      }}
    >
      <Box
        sx={{
          backgroundColor: alpha(iconColor, opacityInner),
          padding: '6px',
          borderRadius: '4px'
        }}
      >
        {icon}
      </Box>
    </Box>
  )
}
