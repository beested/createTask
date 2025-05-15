import { atom } from 'jotai';
import { TaskFormData } from './task-form/task-form-schema';

export const tasksAtom = atom<any[]>([]);

export const openModalAtom = atom(false);
export const openModalDeleteAtom = atom(false);

export const snackbarAtom = atom<{
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
}>({
  open: false,
  message: '',
  severity: 'info',
});

export const selectedTaskAtom = atom<TaskFormData | null>(null);
