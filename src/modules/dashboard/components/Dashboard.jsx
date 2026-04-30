import { useTaskStore } from '../../../core/store/useTaskStore.js';
import { CheckCircle2, Clock, AlertCircle, ListTodo } from 'lucide-react';
import { getTodayISO } from '../../../core/utils/date.js';
import StatCard from './StatCard.jsx';
import TaskItem from './TaskItem.jsx';
import ProjectProgressCard from './ProjectProgressCard.jsx';

export default function Dashboard() {
  const { state, getTaskStats } = useTaskStore();
  const stats = getTaskStats();
  const today = getTodayISO();

  const todayTasks = state.tasks.filter(t => t.dueDate === today && t.status !== 'done').slice(0, 5);
  const overdueTasks = state.tasks.filter(t => t.dueDate && t.dueDate < today && t.status !== 'done').slice(0, 5);
  const recentTasks = [...state.tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

  const projectProgress = state.projects.map(project => {
    const projectTasks = state.tasks.filter(t => t.projectId === project.id);
    const completed = projectTasks.filter(t => t.status === 'done').length;
    const total = projectTasks.length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { ...project, completed, total, percent };
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800">仪表盘</h2>
        <p className="text-sm text-gray-500 mt-1">概览你的任务和项目进展</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={ListTodo} label="总任务" value={stats.total} colorClass="text-primary" bgClass="bg-indigo-50" />
        <StatCard icon={CheckCircle2} label="已完成" value={stats.completed} colorClass="text-success" bgClass="bg-green-50" />
        <StatCard icon={Clock} label="今日待办" value={stats.todayDue} colorClass="text-warning" bgClass="bg-amber-50" />
        <StatCard icon={AlertCircle} label="已逾期" value={stats.overdue} colorClass="text-danger" bgClass="bg-red-50" />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">项目进度</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projectProgress.map(p => <ProjectProgressCard key={p.id} project={p} />)}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-700">今日待办</h3>
            <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full font-medium">{todayTasks.length}</span>
          </div>
          <div className="space-y-2">
            {todayTasks.length > 0 ? todayTasks.map(t => <TaskItem key={t.id} task={t} />) : (
              <div className="text-center py-8 text-gray-400 text-sm">今日没有待办任务 🎉</div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-700">已逾期</h3>
            <span className="text-xs px-2 py-1 bg-danger/10 text-danger rounded-full font-medium">{overdueTasks.length}</span>
          </div>
          <div className="space-y-2">
            {overdueTasks.length > 0 ? overdueTasks.map(t => <TaskItem key={t.id} task={t} />) : (
              <div className="text-center py-8 text-gray-400 text-sm">没有逾期任务，继续保持！</div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">最近添加</h3>
        <div className="space-y-2">
          {recentTasks.map(t => <TaskItem key={t.id} task={t} />)}
        </div>
      </div>
    </div>
  );
}
