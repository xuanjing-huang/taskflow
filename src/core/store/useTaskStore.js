import { useContext } from 'react';
import { TaskContext } from './TaskContext.jsx';

export function useTaskStore() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error('useTaskStore must be used within TaskProvider');
  return ctx;
}
