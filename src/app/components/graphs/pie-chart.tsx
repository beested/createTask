'use client'

import { Card, CardContent, CardHeader, Typography } from '@mui/material'
import { useAtom } from 'jotai'
import { useMemo } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { tasksAtom } from '../Pages/Dashboard/atoms'
import { CustomTooltip } from './tooltip'

const STATUS_COLORS: Record<string, string> = {
  Pendente: 'url(#pendenteGradient)',
  'Em andamento': 'url(#andamentoGradient)',
  Concluída: 'url(#concluidaGradient)'
}

export default function DashboardPie() {
  const [dataTable] = useAtom(tasksAtom)

  const chartData = useMemo(() => {
    const countByStatus: Record<string, number> = {}

    dataTable.forEach((task: any) => {
      const status = task.status || 'Sem status'
      countByStatus[status] = (countByStatus[status] || 0) + 1
    })

    return Object.entries(countByStatus).map(([status, value]) => ({
      name: status,
      value
    }))
  }, [dataTable])

  return (
    <Card
      sx={{
        width: '100%',
        boxShadow: 3,
        borderRadius: 2,
        overflow: 'hidden'
      }}
    >
      <CardHeader
        sx={{
          textAlign: 'center',
          p: 1
        }}
        title={
          <Typography variant="h6" color="textPrimary">
            Tarefas por status
          </Typography>
        }
      />
      <CardContent sx={{ padding: 2 }}>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <defs>
              <radialGradient id="pendenteGradient" cx="50%" cy="50%" r="70%">
                <stop offset="0%" stopColor="#facc15" />
                <stop offset="100%" stopColor="#ea580c" />
              </radialGradient>

              <radialGradient id="andamentoGradient" cx="50%" cy="50%" r="70%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1e40af" />
              </radialGradient>

              <radialGradient id="concluidaGradient" cx="50%" cy="50%" r="70%">
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#166534" />
              </radialGradient>
            </defs>

            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={70}
              innerRadius={40}
              paddingAngle={5}
              stroke="none"
              isAnimationActive
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={STATUS_COLORS[entry.name] || '#9e9e9e'}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
