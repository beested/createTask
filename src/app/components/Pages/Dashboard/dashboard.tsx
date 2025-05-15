'use client'

import { Box, Button, Container, Modal, Stack, Typography } from '@mui/material'
import { useSetAtom } from 'jotai'
import { Paintbrush, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic' // Adicione o import para dynamic

import { Breadcrumb } from '../../breadcrumb/breadcrumb'
import { ButtonStale } from '../../button/button'
import DashboardArea from '../../graphs/area-chart'
import DashboardBar from '../../graphs/bar-chart'
import DashboardPie from '../../graphs/pie-chart'
import { openModalAtom, tasksAtom } from './atoms'
import { DataTable } from './table/table-data'
import { TaskDelete } from './task-delete/task-delete'
import { TaskForm } from './task-form/task-form'

// Carrega Joyride dinamicamente, desativando SSR
const DynamicJoyride = dynamic(
  () => import('react-joyride').then(mod => mod.default),
  {
    ssr: false, // Desativa SSR
    loading: () => <div>Carregando tour...</div> // Opcional: placeholder
  }
)

export const Dashboard = () => {
  const setDataTable = useSetAtom(tasksAtom)
  const setOpenModal = useSetAtom(openModalAtom)

  const [runTour, setRunTour] = useState(false) // Tour não inicia automaticamente
  const [openWelcomeModal, setOpenWelcomeModal] = useState(true) // Modal inicia aberto

  const steps = [
    {
      target: '.init-tour',
      content: 'Aqui você vê o caminho de navegação dentro do sistema.'
    },
    {
      target: '.breadcrumb-tour',
      content: 'Aqui você vê o caminho de navegação dentro do sistema.'
    },
    {
      target: '.button-add-task',
      content: 'Clique aqui para adicionar uma nova tarefa ao dashboard.'
    },
    {
      target: '.table-tasks',
      content: 'Aqui você vê a lista de tarefas cadastradas.'
    },
    {
      target: '.charts-area',
      content: 'Esses gráficos mostram um resumo visual das tarefas.'
    }
  ]

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') ?? '[]')
    setDataTable(storedTasks)
  }, [])

  const handleStartTour = () => {
    setOpenWelcomeModal(false)
    setRunTour(true)
  }

  const handleCloseModal = () => {
    setOpenWelcomeModal(false)
  }

  return (
    <>
      <Modal
        open={openWelcomeModal}
        onClose={handleCloseModal}
        aria-labelledby="welcome-modal-title"
        aria-describedby="welcome-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2
          }}
        >
          <Typography
            id="welcome-modal-title"
            variant="h6"
            component="h2"
            gutterBottom
          >
            Seja bem-vindo ao seu Dashboard!
          </Typography>

          <Typography id="welcome-modal-description" sx={{ mb: 3 }}>
            Este é o seu espaço de produtividade. Que tal fazer um tour guiado
            para conhecer melhor as funcionalidades do nosso gerenciador de
            tarefas?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button onClick={handleCloseModal} color="inherit">
              Fechar
            </Button>
            <Box className="init-tour">
              <Button
                onClick={handleStartTour}
                variant="contained"
                color="primary"
              >
                Iniciar Tour
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>

      <DynamicJoyride
        steps={steps}
        run={runTour}
        continuous
        showProgress
        showSkipButton
        locale={{
          back: 'Voltar',
          close: 'Fechar',
          last: 'Finalizar',
          next: 'Próximo',
          skip: 'Pular'
        }}
        styles={{
          options: {
            zIndex: 10000
          }
        }}
        callback={data => {
          if (['finished', 'skipped'].includes(data.status)) {
            setRunTour(false)
          }
        }}
      />

      <TaskForm />
      <TaskDelete />

      <Container
        maxWidth="xl"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 2
            }}
          >
            <Box className="breadcrumb-tour">
              <Breadcrumb
                title="Dashboard"
                link="Cadastros"
                subLink="Tarefas"
              />
            </Box>
            <Stack
              direction="column"
              gap={2}
              sx={{ display: 'flex', flexDirection: 'row' }}
            >
              <Box className="button-add-task">
                <ButtonStale
                  text="Limpar registros"
                  onClick={() => {
                    localStorage.removeItem('tasks')
                    setDataTable([])
                  }}
                  icon={<Paintbrush size={16} />}
                  color="error"
                  variant="outlined"
                />
              </Box>
              <Box className="button-add-task">
                <ButtonStale
                  text="Adicionar"
                  onClick={() => setOpenModal(true)}
                  icon={<Plus size={16} />}
                  color="primary"
                />
              </Box>
            </Stack>
          </Box>
          <Box className="table-tasks">
            <DataTable />
          </Box>
        </Box>

        <Box
          className="charts-area"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            gap: 2,
            mt: 2
          }}
        >
          <DashboardBar />
          <DashboardPie />
          <DashboardArea />
        </Box>
      </Container>
    </>
  )
}
