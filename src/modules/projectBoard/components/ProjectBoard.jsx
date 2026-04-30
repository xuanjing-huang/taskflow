import { useState } from 'react';
import { useTaskStore } from '../../../core/store/useTaskStore.js';
import { Plus, Filter, LayoutGrid, List, Trash2 } from 'lucide-react';
import { useDragAndDrop } from '../hooks/useDragAndDrop.js';
import BoardView from './BoardView.jsx';
import ListView from './ListView.jsx';
import TaskModal from '../../task/components/TaskModal.jsx';

export default function ProjectBoard({ projectId }) {
  const { state, dispatch } = useTaskStore();
  const project = state.projects.find(p => p.id === projectId);
  const [viewMode, setViewMode] = useState('board');
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const { draggedTaskId, dragOverColumn, handleDragStart, handleDragOver, handleDrop } = useDragAndDrop(
    (taskId, status) => dispatch({ type: 'MOVE_TASK_STATUS', payload: { taskId, status } })
  );

  if (!project) return null;

  const tasks = state.tasks.filter(t => t.projectId === projectId);

  const handleDeleteProject = () => {
    if (state.projects.length <= 1) {
      alert('至少需要保留一个项目');
      return;
    }
    const taskCount = state.tasks.filter(t => t.projectId === projectId).length;
    const msg = taskCount > 0
      ? `确定要删除"${project.name}"吗？该项目下还有 ${taskCount} 个任务，删除后无法恢复。`
      : `确定要删除"${project.name}"吗？`;
    if (confirm(msg)) {
      dispatch({ type: 'DELETE_PROJECT', payload: projectId });
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="w-4 h-4 rounded-full" style={{ backgroundColor: project.color }} />
          <h2 className="text-xl font-bold text-gray-800">{project.name}</h2>
          <span className="text-sm text-gray-400">{tasks.length} 个任务</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden">
            <button onClick={() => setViewMode('board')} className={`p-2 ${viewMode === 'board' ? 'bg-gray-100 text-gray-800' : 'text-gray-400 hover:text-gray-600'}`}>
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button onClick={() => setViewMode('list')} className={`p-2 ${viewMode === 'list' ? 'bg-gray-100 text-gray-800' : 'text-gray-400 hover:text-gray-600'}`}>
              <List className="w-4 h-4" />
            </button>
          </div>
          <button onClick={() => { setEditingTask(null); setShowTaskModal(true); }} className="flex items-center gap-1.5 px-3 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors">
            <Plus className="w-4 h-4" /> 新建任务
          </button>
          <button onClick={handleDeleteProject} className="p-2 text-gray-400 hover:text-danger hover:bg-red-50 rounded-lg transition-colors" title="删除项目">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 bg-white border border-gray-200 rounded-lg p-3">
        <Filter className="w-4 h-4 text-gray-400" />
        <select value={state.filter.priority} onChange={(e) => dispatch({ type: 'SET_FILTER', payload: { priority: e.target.value } })} className="text-sm border border-gray-200 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary/20">
          <option value="all">全部优先级</option>
          <option value="high">高优先级</option>
          <option value="medium">中优先级</option>
          <option value="low">低优先级</option>
        </select>
        <select value={state.filter.sortBy} onChange={(e) => dispatch({ type: 'SET_FILTER', payload: { sortBy: e.target.value } })} className="text-sm border border-gray-200 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary/20">
          <option value="dueDate">按截止日期</option>
          <option value="priority">按优先级</option>
          <option value="createdAt">按创建时间</option>
        </select>
      </div>

      {viewMode === 'board' ? (
        <BoardView
          tasks={tasks}
          sortBy={state.filter.sortBy}
          draggedTaskId={draggedTaskId}
          dragOverColumn={dragOverColumn}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onEdit={handleEditTask}
        />
      ) : (
        <ListView tasks={tasks} onEdit={handleEditTask} />
      )}

      {showTaskModal && (
        <TaskModal projectId={projectId} task={editingTask} onClose={() => { setShowTaskModal(false); setEditingTask(null); }} />
      )}
    </div>
  );
}
