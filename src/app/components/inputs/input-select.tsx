import { MenuItem, TextField } from '@mui/material'
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path
} from 'react-hook-form'

interface InputSelectProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  errors: FieldErrors<T>
  label: string
  size?: 'small' | 'medium'
  fullWidth?: boolean
  options: { value: T[keyof T]; label: string }[]
}

export function InputSelect<T extends FieldValues>({
  name,
  control,
  errors,
  label,
  size = 'small',
  fullWidth = true,
  options
}: InputSelectProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          select
          size={size}
          fullWidth={fullWidth}
          error={!!errors[name]}
          helperText={errors[name]?.message as string}
        >
          {options.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  )
}
