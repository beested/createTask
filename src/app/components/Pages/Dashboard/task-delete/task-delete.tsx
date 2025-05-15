import { ButtonStale } from '@/app/components/button/button'
import { IconStyle } from '@/app/components/icon-style/icon-style'
import { useSnackbar } from '@/context/useSnackBar'
import { Box, Modal, Stack, Typography } from '@mui/material'
import { useAtom, useSetAtom } from 'jotai'
import { Trash2 } from 'lucide-react'
import { openModalDeleteAtom, selectedTaskAtom, tasksAtom } from '../atoms'

export const TaskDelete = () => {
  const { showMessage } = useSnackbar()
  const [openModal, setOpenModal] = useAtom(openModalDeleteAtom)
  const [selectedTask] = useAtom(selectedTaskAtom)
  const setDataTable = useSetAtom(tasksAtom)

  const handleDelete = () => {
    if (!selectedTask?.id) {
      showMessage('Nenhuma tarefa selecionada!', 'error')
      setOpenModal(false)
      return
    }

    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]')

    const updatedTasks = storedTasks.filter(
      (task: { id: number }) => task.id !== selectedTask.id
    )

    localStorage.setItem('tasks', JSON.stringify(updatedTasks))

    setDataTable(updatedTasks)

    setOpenModal(false)
    showMessage('Tarefa excluída com sucesso!', 'success')
  }

  return (
    <Modal open={openModal} onClose={() => setOpenModal(false)}>
      <Box
        key="modalDelete"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 2,
          borderRadius: 2,
          minWidth: 310,
          maxWidth: 400
        }}
      >
        <Stack
          spacing={2}
          direction="column"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <IconStyle icon={<Trash2 size={12} color="#FF0000" />} />

          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirmação
          </Typography>
        </Stack>
        <Typography
          variant="inherit"
          id="modal-modal-description"
          sx={{ mt: 2 }}
        >
          Deseja realmente excluir a tarefa{' '}
          <strong>{selectedTask?.task}</strong>?
        </Typography>
        <Stack gap={1} direction="row" width="100%" justifyContent="end" mt={2}>
          <ButtonStale
            color="inherit"
            text="Cancelar"
            onClick={() => setOpenModal(false)}
            size="small"
            variant="outlined"
          />
          <ButtonStale
            color="error"
            text="Deletar"
            onClick={handleDelete}
            size="small"
          />
        </Stack>
      </Box>
    </Modal>
  )
}
