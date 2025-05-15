'use client'

import { Box, Pagination, Typography } from '@mui/material'
import { DataGrid, GridPaginationModel } from '@mui/x-data-grid'
import { useAtom } from 'jotai'
import { useState } from 'react'
import { tasksAtom } from '../atoms'
import { AuditEmptyLottie } from '../table-empty/table-empty'
import { columns } from './table-columns'

export const DataTable = () => {
  const [dataTable] = useAtom(tasksAtom)
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5
  })

  const isEmpty = dataTable.length === 0
  const pageCount = Math.ceil(dataTable.length / paginationModel.pageSize)

  return (
    <Box
      sx={{
        height: '38vh',
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
      }}
    >
      {isEmpty ? (
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            borderRadius: 2,
            border: 1,
            borderColor: 'divider'
          }}
        >
          <Box sx={{ width: 200 }}>
            <AuditEmptyLottie />
          </Box>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Nenhuma tarefa encontrada.
          </Typography>
        </Box>
      ) : (
        <>
          <Box sx={{ flexGrow: 1 }}>
            <DataGrid
              rows={dataTable}
              columns={columns}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              paginationMode="client"
              disableRowSelectionOnClick
              disableAutosize
              disableColumnFilter
              disableColumnResize
              disableColumnMenu
              rowSelection={false}
              hideFooterPagination
              hideFooter
              sx={{
                height: '100%',
                '& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus':
                  {
                    outline: 'none'
                  },
                '& .MuiDataGrid-cell:focus-visible, & .MuiDataGrid-columnHeader:focus-visible':
                  {
                    outline: 'none'
                  }
              }}
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 1
            }}
          >
            <Typography variant="body2">
              Página {paginationModel.page + 1} de {pageCount} — Total de{' '}
              {dataTable.length} registros
            </Typography>
            <Pagination
              count={pageCount}
              page={paginationModel.page + 1}
              onChange={(_, value) =>
                setPaginationModel(prev => ({ ...prev, page: value - 1 }))
              }
              color="primary"
              size="small"
              showFirstButton
              showLastButton
            />
          </Box>
        </>
      )}
    </Box>
  )
}
