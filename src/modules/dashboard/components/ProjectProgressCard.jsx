import { useTaskStore } from '../../../core/store/useTaskStore.js';

export default function ProjectProgressCard({ project }) {
  const { dispatch } = useTaskStore();

  return (
    <div
      onClick={() => dispatch({ type: 'SET_VIEW', payload: { type: 'project', projectId: project.id } })}
      className="p-4 rounded-lg border border-gray-100 hover:border-gray-200 hover:shadow-sm cursor-pointer transition-all"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: project.color }} />
        <span className="text-sm font-medium text-gray-800">{project.name}</span>
      </div>
      <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
        <span>{project.completed}/{project.total} 完成</span>
        <span className="font-medium text-gray-700">{project.percent}%</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${project.percent}%`, backgroundColor: project.color }} />
      </div>
    </div>
  );
}
