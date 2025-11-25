import { IPagination } from '../common/dto.common';

interface ITodo {
 text: string;
  done: boolean;
  isimpoertant?: boolean;
  reminded: { type: Boolean, default: false }
  reminderAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface ITodoList extends IPagination{
status?: 'all'
} 
export type {ITodo,ITodoList}