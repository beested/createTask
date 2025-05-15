'use client'

import { Card, CardContent, CardHeader, Typography } from '@mui/material'
import { useAtom } from 'jotai'
import { useMemo } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import { tasksAtom } from '../Pages/Dashboard/atoms'
import { CustomTooltip } from './tooltip'

export default function DashboardArea() {
  const [dataTable] = useAtom(tasksAtom)

  const chartData = useMemo(() => {
    const countByPriority: Record<string, number> = {}

    dataTable.forEach((task: any) => {
      const priority = task.priority?.toLowerCase() || 'indefinida'
      countByPriority[priority] = (countByPriority[priority] || 0) + 1
    })

    return Object.entries(countByPriority).map(([priority, value]) => ({
      priority,
      tasks: value
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
            Tarefas por prioridade
          </Typography>
        }
      />
      <CardContent sx={{ padding: 2 }}>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1976d2" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#1976d2" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="priority" hide />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="tasks"
              stroke="#1976d2"
              fill="url(#colorTasks)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
