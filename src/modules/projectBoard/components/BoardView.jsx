import { Circle, ArrowUpCircle, CheckCircle2 } from 'lucide-react';
import { COLUMNS } from '../../../core/constants/index.js';
import TaskCard from './TaskCard.jsx';

const ICON_MAP = { Circle, ArrowUpCircle, CheckCircle2 };

export default function BoardView({ tasks, sortBy, draggedTaskId, dragOverColumn, onDragOver, onDrop, onEdit }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {COLUMNS.map(column => {
        const Icon = ICON_MAP[column.icon] || Circle;
        const columnTasks = tasks
          .filter(t => t.status === column.id)
          .sort((a, b) => {
            if (sortBy === 'priority') {
              const map = { high: 3, medium: 2, low: 1 };
              return map[b.priority] - map[a.priority];
            }
            if (sortBy === 'dueDate') {
              if (!a.dueDate) return 1;
              if (!b.dueDate) return -1;
              return new Date(a.dueDate) - new Date(b.dueDate);
            }
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
        const isDragOver = dragOverColumn === column.id;

        return (
          <div
            key={column.id}
            onDragOver={(e) => onDragOver(e, column.id)}
            onDrop={(e) => onDrop(e, column.id)}
            className={`flex flex-col rounded-xl border-2 transition-colors ${isDragOver ? 'drag-over' : `${column.borderColor} ${column.color}`}`}
          >
            <div className="flex items-center justify-between p-3 border-b border-gray-200/50">
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-semibold text-gray-700">{column.name}</span>
              </div>
              <span className="text-xs text-gray-400 bg-white/70 px-2 py-0.5 rounded-full">{columnTasks.length}</span>
            </div>
            <div className="p-2 space-y-2 flex-1 min-h-[120px]">
              {columnTasks.map(task => (
                <TaskCard key={task.id} task={task} draggable onEdit={onEdit} draggedTaskId={draggedTaskId} />
              ))}
              {columnTasks.length === 0 && <div className="text-center py-8 text-gray-400 text-xs">拖拽任务到此处</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
