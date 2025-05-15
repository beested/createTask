import { Typography } from '@mui/material'
import {
  GridFooterContainer,
  gridPageSelector,
  gridPageSizeSelector,
  gridRowCountSelector,
  useGridApiContext,
  useGridSelector
} from '@mui/x-data-grid'

export function TableFooter() {
  const apiRef = useGridApiContext()
  const page = useGridSelector(apiRef, gridPageSelector)
  const pageSize = useGridSelector(apiRef, gridPageSizeSelector)
  const rowCount = useGridSelector(apiRef, gridRowCountSelector)

  const from = page * pageSize + 1
  const to = Math.min(rowCount, (page + 1) * pageSize)

  return (
    <GridFooterContainer
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: 2
      }}
    >
      <Typography variant="body2">
        {from}-{to} de {rowCount}
      </Typography>
    </GridFooterContainer>
  )
}
