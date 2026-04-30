import { useTaskStore } from '../../../core/store/useTaskStore.js';
import { Pencil, Trash2 } from 'lucide-react';
import { PRIORITY_CONFIG, STATUS_LABELS, STATUS_COLORS } from '../../../core/constants/index.js';
import { isOverdue } from '../../../core/utils/date.js';

export default function TaskRow({ task, onEdit }) {
  const { dispatch } = useTaskStore();
  const overdue = isOverdue(task.dueDate, task.status);

  return (
    <div className="grid grid-cols-12 gap-4 px-4 py-3 items-center border-b border-gray-100 hover:bg-gray-50 transition-colors group">
      <div className="col-span-5">
        <div className={`text-sm font-medium truncate ${task.status === 'done' ? 'line-through text-gray-400' : 'text-gray-800'}`}>{task.title}</div>
        {task.description && <div className="text-xs text-gray-400 truncate">{task.description}</div>}
      </div>
      <div className="col-span-2">
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${PRIORITY_CONFIG[task.priority].color}`}>{PRIORITY_CONFIG[task.priority].label}</span>
      </div>
      <div className="col-span-2">
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[task.status]}`}>{STATUS_LABELS[task.status]}</span>
      </div>
      <div className={`col-span-2 text-sm ${overdue ? 'text-danger font-medium' : 'text-gray-500'}`}>{task.dueDate || '-'}</div>
      <div className="col-span-1 flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => onEdit(task)} className="p-1 hover:bg-gray-200 rounded">
          <Pencil className="w-3.5 h-3.5 text-gray-400" />
        </button>
        <button onClick={() => dispatch({ type: 'DELETE_TASK', payload: task.id })} className="p-1 hover:bg-red-100 rounded">
          <Trash2 className="w-3.5 h-3.5 text-gray-400 hover:text-danger" />
        </button>
      </div>
    </div>
  );
}
