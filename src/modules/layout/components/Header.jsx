import { useTaskStore } from '../../../core/store/useTaskStore.js';
import { Menu, ChevronRight, CheckCircle2, Clock, AlertCircle, ListTodo } from 'lucide-react';

export default function Header({ onMenuClick }) {
  const { state, getTaskStats } = useTaskStore();
  const stats = getTaskStats();

  const isDashboard = state.currentView === 'dashboard';
  const activeProjectId = typeof state.currentView === 'object' ? state.currentView.projectId : null;

  return (
    <header className="flex items-center justify-between px-4 lg:px-6 py-3 bg-white border-b border-gray-200">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
          <Menu className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="hidden sm:inline">TaskFlow</span>
          <ChevronRight className="w-4 h-4 hidden sm:inline" />
          <span className="font-medium text-gray-800">
            {isDashboard ? '仪表盘' : state.projects.find(p => p.id === activeProjectId)?.name || '项目'}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5 text-gray-500">
            <ListTodo className="w-4 h-4" />
            <span>{stats.total}</span>
          </div>
          <div className="flex items-center gap-1.5 text-success">
            <CheckCircle2 className="w-4 h-4" />
            <span>{stats.completed}</span>
          </div>
          <div className="flex items-center gap-1.5 text-warning">
            <Clock className="w-4 h-4" />
            <span>{stats.todayDue}</span>
          </div>
          {stats.overdue > 0 && (
            <div className="flex items-center gap-1.5 text-danger">
              <AlertCircle className="w-4 h-4" />
              <span>{stats.overdue}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
