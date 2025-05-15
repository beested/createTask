import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { ptBR } from 'date-fns/locale'
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path
} from 'react-hook-form'

interface InputDateProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  errors: FieldErrors<T>
  label: string
  size?: 'small' | 'medium'
  fullWidth?: boolean
  disableFuture?: boolean
}

export function InputDate<T extends FieldValues>({
  name,
  control,
  errors,
  label,
  size = 'small',
  disableFuture = false,
  fullWidth = true
}: InputDateProps<T>) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            {...field}
            label={label}
            value={field.value || null}
            onChange={newValue => field.onChange(newValue)}
            disableFuture={disableFuture}
            slotProps={{
              textField: {
                size,
                fullWidth,
                error: !!errors[name],
                helperText: errors[name]?.message as string,
                sx: {
                  '& .MuiPickersOutlinedInput-root': {
                    borderRadius: '12px'
                  }
                }
              }
            }}
          />
        )}
      />
    </LocalizationProvider>
  )
}
