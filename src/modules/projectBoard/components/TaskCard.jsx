import { useState } from 'react';
import { useTaskStore } from '../../../core/store/useTaskStore.js';
import { Calendar, MoreHorizontal, Pencil, Trash2, GripVertical } from 'lucide-react';
import { PRIORITY_CONFIG } from '../../../core/constants/index.js';
import { isOverdue } from '../../../core/utils/date.js';

export default function TaskCard({ task, draggable, onEdit, draggedTaskId }) {
  const { dispatch } = useTaskStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const overdue = isOverdue(task.dueDate, task.status);

  return (
    <div
      draggable={draggable}
      onDragStart={(e) => { e.dataTransfer.setData('text/plain', task.id); }}
      className={`bg-white rounded-lg border border-gray-200 p-3 shadow-sm hover:shadow-md transition-shadow group relative ${draggedTaskId === task.id ? 'opacity-50' : ''}`}
    >
      <div className="flex items-start gap-2">
        {draggable && <GripVertical className="w-4 h-4 text-gray-300 mt-0.5 cursor-grab active:cursor-grabbing" />}
        <div className="flex-1 min-w-0">
          <h4 className={`text-sm font-medium ${task.status === 'done' ? 'line-through text-gray-400' : 'text-gray-800'}`}>
            {task.title}
          </h4>
          {task.description && <p className="text-xs text-gray-500 mt-1 line-clamp-2">{task.description}</p>}
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${PRIORITY_CONFIG[task.priority].color}`}>
              {PRIORITY_CONFIG[task.priority].label}
            </span>
            {task.dueDate && (
              <span className={`text-xs flex items-center gap-0.5 ${overdue ? 'text-danger' : 'text-gray-400'}`}>
                <Calendar className="w-3 h-3" /> {task.dueDate}
              </span>
            )}
          </div>
        </div>
        <div className="relative">
          <button onClick={() => setMenuOpen(v => !v)} className="p-1 hover:bg-gray-100 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreHorizontal className="w-4 h-4 text-gray-400" />
          </button>
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 top-8 w-32 bg-white rounded-lg border border-gray-200 shadow-lg z-20 py-1">
                <button onClick={() => { onEdit(task); setMenuOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
                  <Pencil className="w-3.5 h-3.5" /> 编辑
                </button>
                <button onClick={() => { dispatch({ type: 'DELETE_TASK', payload: task.id }); setMenuOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-danger hover:bg-red-50">
                  <Trash2 className="w-3.5 h-3.5" /> 删除
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
