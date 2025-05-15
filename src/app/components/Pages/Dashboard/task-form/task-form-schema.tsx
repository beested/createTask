import { z } from 'zod'

export const taskFormSchema = z.object({
  id: z.number().optional().nullable(),
  task: z.string().min(1, 'A tarefa é obrigatória'),
  status: z.enum(['Pendente', 'Em andamento', 'Concluída']),
  createdAt: z.coerce.date({
    required_error: 'A data de criação é obrigatória',
    invalid_type_error: 'A data de criação deve ser uma data válida'
  }),
  dueDate: z.coerce.date().optional(),
  priority: z.enum(['Baixa', 'Média', 'Alta'], {
    errorMap: () => ({ message: 'Selecione uma prioridade válida' })
  })
})

export type TaskFormData = z.infer<typeof taskFormSchema>
