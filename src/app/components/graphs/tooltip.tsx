export const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0]
    const isPlural = value !== 1
    const label = isPlural ? 'Tarefas' : 'Tarefa'

    return (
      <div
        style={{
          backgroundColor: '#333',
          color: '#fff',
          padding: '8px 12px',
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}
      >
        <p style={{ margin: 0 }}>{`${value} ${label}`}</p>
      </div>
    )
  }

  return null
}
