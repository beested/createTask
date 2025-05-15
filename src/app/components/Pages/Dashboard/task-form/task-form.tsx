import { ButtonStale } from '@/app/components/button/button'
import { IconStyle } from '@/app/components/icon-style/icon-style'
import { InputDate } from '@/app/components/inputs/input-date'
import { InputSelect } from '@/app/components/inputs/input-select'
import { InputText } from '@/app/components/inputs/input-text'
import { useSnackbar } from '@/context/useSnackBar'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Modal, Stack, Typography } from '@mui/material'
import { useAtom } from 'jotai'
import { Bookmark } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { openModalAtom, selectedTaskAtom, tasksAtom } from '../atoms'
import { TaskFormData, taskFormSchema } from './task-form-schema'

export const TaskForm = () => {
  const { showMessage } = useSnackbar()

  const [dataTable, setDataTable] = useAtom(tasksAtom)
  const [openModal, setOpenModal] = useAtom(openModalAtom)
  const [selectedTask, setSelectedTask] = useAtom(selectedTaskAtom)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      task: '',
      status: 'Pendente',
      createdAt: new Date(),
      priority: 'Baixa',
      dueDate: undefined,
      id: undefined
    }
  })

  useEffect(() => {
    if (selectedTask) {
      reset({
        task: selectedTask.task,
        status: selectedTask.status,
        createdAt: new Date(selectedTask.createdAt),
        priority: selectedTask.priority,
        dueDate: selectedTask.dueDate
          ? new Date(selectedTask.dueDate)
          : undefined,
        id: selectedTask.id
      })
    } else {
      resetForm()
    }
  }, [selectedTask, reset])

  const resetForm = () => {
    reset({
      task: '',
      status: 'Pendente',
      createdAt: new Date(),
      priority: 'Baixa',
      dueDate: undefined,
      id: undefined
    })
  }

  const handleSaveTask = (data: TaskFormData) => {
    const generateRandomId = () => {
      return Math.floor(1000 + Math.random() * 9000)
    }

    const getUniqueId = () => {
      let newId: number
      do {
        newId = generateRandomId()
      } while (dataTable.some(task => task.id === newId))
      return newId
    }

    if (selectedTask) {
      const updatedTasks = dataTable.map(task =>
        task.id === selectedTask.id ? { ...task, ...data } : task
      )
      setDataTable(updatedTasks)
      localStorage.setItem('tasks', JSON.stringify(updatedTasks))
      showMessage('Tarefa atualizada com sucesso!', 'success')
      setSelectedTask(null)
      resetForm()
    } else {
      const newTask = {
        id: getUniqueId(),
        task: data.task,
        status: data.status,
        createdAt: data.createdAt.toISOString(),
        priority: data.priority,
        dueDate: data.dueDate ? data.dueDate.toISOString() : undefined
      }
      const updatedTasks = [...dataTable, newTask]
      setDataTable(updatedTasks)
      localStorage.setItem('tasks', JSON.stringify(updatedTasks))
      showMessage('Tarefa adicionada com sucesso!', 'success')
    }

    setOpenModal(false)
    resetForm()
  }

  return (
    <Modal
      open={openModal}
      onClose={(_, reason) => {
        if (reason !== 'backdropClick') return
      }}
      disableEscapeKeyDown
    >
      <Box
        key="formModal"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          minWidth: 300,
          maxWidth: 500
        }}
      >
        <form onSubmit={handleSubmit(handleSaveTask)}>
          <Box display="flex" flexDirection="column" gap={2}>
            <Stack
              spacing={2}
              direction="column"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <IconStyle
                icon={<Bookmark size={24} color="#2563eb" />}
                iconColor="#2563eb"
              />
              <Typography variant="h6">
                {selectedTask ? 'Editar' : 'Nova'} Tarefa
              </Typography>
            </Stack>

            <InputText
              name="task"
              control={control}
              errors={errors}
              label="Tarefa"
            />

            <InputSelect
              name="status"
              control={control}
              errors={errors}
              label="Status"
              options={[
                { value: 'Pendente', label: 'Pendente' },
                { value: 'Em andamento', label: 'Em andamento' },
                { value: 'Concluída', label: 'Concluída' }
              ]}
            />

            <InputDate
              name="createdAt"
              control={control}
              errors={errors}
              label="Data de criação"
              disableFuture
            />
            <InputDate
              name="dueDate"
              control={control}
              errors={errors}
              label="Data de conclusão"
            />

            <InputSelect
              name="priority"
              control={control}
              errors={errors}
              label="Status"
              options={[
                { value: 'Baixa', label: 'Baixa' },
                { value: 'Média', label: 'Média' },
                { value: 'Alta', label: 'Alta' }
              ]}
            />

            <Box display="flex" justifyContent="flex-end" gap={1}>
              <ButtonStale
                onClick={() => {
                  setOpenModal(false)
                  resetForm()
                }}
                text="Voltar"
                variant="outlined"
                color="inherit"
                size="small"
              />
              <ButtonStale
                type="submit"
                text="Salvar"
                variant="contained"
                color="success"
                size="small"
              />
            </Box>
          </Box>
        </form>
      </Box>
    </Modal>
  )
}
