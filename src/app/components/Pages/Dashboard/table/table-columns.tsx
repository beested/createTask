import { Box, Chip } from '@mui/material'
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useSetAtom } from 'jotai'
import { Pencil, Trash2 } from 'lucide-react'
import { openModalAtom, openModalDeleteAtom, selectedTaskAtom } from '../atoms'

export const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', flex: 0.4, minWidth: 90 },
  { field: 'task', headerName: 'Tarefa', flex: 1, minWidth: 180 },
  {
    field: 'status',
    headerName: 'Status',
    flex: 0.8,
    minWidth: 150,
    headerAlign: 'center',
    renderCell: params => (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%'
        }}
      >
        <Chip
          label={params.value}
          color={
            params.value === 'Concluída'
              ? 'success'
              : params.value === 'Pendente'
              ? 'warning'
              : 'info'
          }
          sx={{
            backgroundColor: theme =>
              params.value === 'Concluída'
                ? theme.palette.success.main + '40'
                : params.value === 'Pendente'
                ? theme.palette.warning.main + '40'
                : theme.palette.info.main + '40',
            color: theme =>
              params.value === 'Concluída'
                ? theme.palette.success.main
                : params.value === 'Pendente'
                ? theme.palette.warning.main
                : theme.palette.info.main,
            fontWeight: 'bold',
            borderRadius: '12px'
          }}
        />
      </Box>
    )
  },
  {
    field: 'createdAt',
    headerName: 'Data de Criação',
    flex: 0.9,
    minWidth: 180,
    renderCell: params => {
      if (!params.value || typeof params.value !== 'string')
        return <Box>Data inválida</Box>
      const date = parseISO(params.value)
      const formattedDate = format(date, "dd 'de' MMMM 'de' yyyy", {
        locale: ptBR
      })
      return <Box>{formattedDate}</Box>
    }
  },
  {
    field: 'dueDate',
    headerName: 'Data de Conclusão',
    flex: 0.9,
    minWidth: 180,
    renderCell: params => {
      if (!params.value) return <Box>Não informado</Box>
      const formattedDate = format(
        parseISO(params.value),
        "dd 'de' MMMM 'de' yyyy",
        { locale: ptBR }
      )
      return <Box>{formattedDate}</Box>
    }
  },
  {
    field: 'priority',
    headerName: 'Prioridade',
    flex: 0.6,
    minWidth: 120,
    headerAlign: 'center',
    renderCell: params => (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%'
        }}
      >
        <Chip
          label={params.value}
          sx={{
            backgroundColor: theme =>
              params.value === 'Alta'
                ? theme.palette.error.main + '40'
                : params.value === 'Baixa'
                ? theme.palette.grey[500] + '40'
                : theme.palette.warning.light + '40',
            color: theme =>
              params.value === 'Alta'
                ? theme.palette.error.main
                : params.value === 'Baixa'
                ? theme.palette.grey[500]
                : theme.palette.warning.light,
            fontWeight: 'bold',
            borderRadius: '12px'
          }}
        />
      </Box>
    )
  },
  {
    field: 'actions',
    headerName: 'Ações',
    flex: 0.7,
    minWidth: 150,
    sortable: false,
    headerAlign: 'right',
    renderCell: params => {
      const setOpenModal = useSetAtom(openModalAtom)
      const setOpenDeleteModal = useSetAtom(openModalDeleteAtom)
      const setSelectedTask = useSetAtom(selectedTaskAtom)

      const handleDelete = (id: number) => {
        setOpenDeleteModal(true)
        const storedTasks = localStorage.getItem('tasks')
        if (!storedTasks) return
        const tasksArray = JSON.parse(storedTasks)
        const taskToDelete = tasksArray.find(
          (task: { id: number }) => task.id === id
        )
        setSelectedTask(taskToDelete)
      }

      const handleEdit = (id: number) => {
        const storedTasks = localStorage.getItem('tasks')
        if (!storedTasks) return
        const tasksArray = JSON.parse(storedTasks)
        const taskToEdit = tasksArray.find(
          (task: { id: number }) => task.id === id
        )
        if (taskToEdit) {
          setSelectedTask(taskToEdit)
          setOpenModal(true)
        }
      }

      return (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            justifyContent: 'end',
            width: '100%',
            height: '100%'
          }}
        >
          <GridActionsCellItem
            icon={<Pencil size={18} color="#2563eb" />}
            label="Editar"
            onClick={() => handleEdit(params.row.id)}
          />
          <GridActionsCellItem
            icon={<Trash2 size={18} color="#dc2626" />}
            label="Deletar"
            onClick={() => handleDelete(params.row.id)}
          />
        </Box>
      )
    }
  }
]
