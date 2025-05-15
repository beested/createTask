import { TextField, TextFieldProps } from '@mui/material'
import { ReactNode } from 'react'
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path
} from 'react-hook-form'

interface InputTextProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  errors: FieldErrors<T>
  label: string
  type?: TextFieldProps['type']
  size?: TextFieldProps['size']
  fullWidth?: boolean
  select?: boolean
  children?: ReactNode
}

export function InputText<T extends FieldValues>({
  name,
  control,
  errors,
  label,
  type = 'text',
  size = 'small',
  fullWidth = true,
  select = false,
  children
}: InputTextProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          type={type}
          size={size}
          fullWidth={fullWidth}
          select={select}
          error={!!errors[name]}
          helperText={errors[name]?.message as string}
          InputLabelProps={type === 'date' ? { shrink: true } : undefined}
        >
          {children}
        </TextField>
      )}
    />
  )
}
