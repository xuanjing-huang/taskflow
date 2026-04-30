import { useTaskStore } from '../../../core/store/useTaskStore.js';
import { ArrowRight, Calendar } from 'lucide-react';
import { PRIORITY_CONFIG } from '../../../core/constants/index.js';
import { isOverdue } from '../../../core/utils/date.js';

export default function TaskItem({ task }) {
  const { state, dispatch } = useTaskStore();
  const project = state.projects.find(p => p.id === task.projectId);
  const priority = PRIORITY_CONFIG[task.priority];
  const overdue = isOverdue(task.dueDate, task.status);

  return (
    <div
      onClick={() => dispatch({ type: 'SET_VIEW', payload: { type: 'project', projectId: task.projectId } })}
      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors group"
    >
      <div className={`w-2 h-2 rounded-full shrink-0 ${task.status === 'done' ? 'bg-success' : overdue ? 'bg-danger' : 'bg-gray-300'}`} />
      <div className="flex-1 min-w-0">
        <div className={`text-sm font-medium truncate ${task.status === 'done' ? 'line-through text-gray-400' : 'text-gray-800'}`}>
          {task.title}
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-gray-400">{project?.name}</span>
          {task.dueDate && (
            <span className={`text-xs flex items-center gap-0.5 ${overdue ? 'text-danger' : 'text-gray-400'}`}>
              <Calendar className="w-3 h-3" /> {task.dueDate}
            </span>
          )}
        </div>
      </div>
      <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${priority.color}`}>{priority.label}</span>
      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors shrink-0" />
    </div>
  );
}
