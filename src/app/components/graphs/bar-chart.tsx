'use client'

import { Card, CardContent, CardHeader, Typography } from '@mui/material'
import { format, isValid, parseISO } from 'date-fns'
import { useAtom } from 'jotai'
import { useMemo } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis
} from 'recharts'
import { tasksAtom } from '../Pages/Dashboard/atoms'
import { CustomTooltip } from './tooltip'

const BAR_GRADIENT_ID = 'barGradient'

export default function DashboardBar() {
  const [dataTable] = useAtom(tasksAtom)

  const chartData = useMemo(() => {
    const countByDate: Record<string, number> = {}

    dataTable.forEach((task: any) => {
      let dateObj

      try {
        dateObj = task.createdAt.includes('T')
          ? parseISO(task.createdAt)
          : new Date(task.createdAt)
      } catch {
        return
      }

      if (!isValid(dateObj)) return

      const formatted = format(dateObj, 'dd/MM')
      countByDate[formatted] = (countByDate[formatted] || 0) + 1
    })

    return Object.entries(countByDate)
      .map(([date, value]) => ({
        date,
        tasks: value
      }))
      .sort(
        (a, b) =>
          parseISO(a.date.split('/').reverse().join('-')).getTime() -
          parseISO(b.date.split('/').reverse().join('-')).getTime()
      )
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
            Tarefas por dias
          </Typography>
        }
      />
      <CardContent sx={{ padding: 2 }}>
        <ResponsiveContainer width="100%" height={208}>
          <BarChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <defs>
              <linearGradient id={BAR_GRADIENT_ID} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#64b5f6" />
                <stop offset="100%" stopColor="#1976d2" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="tasks"
              fill={`url(#${BAR_GRADIENT_ID})`}
              radius={[6, 6, 0, 0]}
              barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
