import { useState, useEffect } from 'react';

const DEFAULT_FORM = {
  title: '',
  description: '',
  priority: 'medium',
  status: 'todo',
  dueDate: '',
  projectId: '',
};

export function useTaskForm({ task, projectId }) {
  const isEdit = !!task;

  const [form, setForm] = useState({ ...DEFAULT_FORM });

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'medium',
        status: task.status || 'todo',
        dueDate: task.dueDate || '',
        projectId: task.projectId || projectId || '',
      });
    } else {
      setForm({
        ...DEFAULT_FORM,
        dueDate: new Date().toISOString().split('T')[0],
        projectId: projectId || '',
      });
    }
  }, [task, projectId]);

  const updateField = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const isValid = form.title.trim().length > 0;

  return { form, isEdit, isValid, updateField };
}
