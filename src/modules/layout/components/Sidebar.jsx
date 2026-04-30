import { useState } from 'react';
import { useTaskStore } from '../../../core/store/useTaskStore.js';
import {
  LayoutDashboard, Plus, Search, Download, Upload, X, ListTodo, Pencil
} from 'lucide-react';
import ProjectModal from '../../project/components/ProjectModal.jsx';

export default function Sidebar({ isOpen, onClose }) {
  const { state, dispatch, exportData, importData } = useTaskStore();
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const isDashboard = state.currentView === 'dashboard';
  const activeProjectId = typeof state.currentView === 'object' ? state.currentView.projectId : null;

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      importData(file).then(() => alert('导入成功')).catch(() => alert('导入失败，请检查文件格式'));
    }
    e.target.value = '';
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      )}

      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 flex flex-col`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <ListTodo className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-bold text-gray-800">TaskFlow</h1>
          </div>
          <button onClick={onClose} className="lg:hidden p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-4 space-y-1 overflow-y-auto flex-1">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="搜索任务..."
              value={state.searchQuery}
              onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
              className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          <button
            onClick={() => { dispatch({ type: 'SET_VIEW', payload: 'dashboard' }); onClose(); }}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isDashboard ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <LayoutDashboard className="w-4 h-4" />
            仪表盘
          </button>

          <div className="pt-4">
            <div className="flex items-center justify-between px-3 mb-2">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">项目</span>
              <button onClick={() => setShowProjectModal(true)} className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-primary transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-1">
              {state.projects.map(project => {
                const taskCount = state.tasks.filter(t => t.projectId === project.id).length;
                const isActive = activeProjectId === project.id;
                return (
                  <div
                    key={project.id}
                    className={`group flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <button
                      onClick={() => { dispatch({ type: 'SET_VIEW', payload: { type: 'project', projectId: project.id } }); onClose(); }}
                      className="flex items-center gap-2 min-w-0 flex-1 text-left"
                    >
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: project.color }} />
                      <span className="truncate">{project.name}</span>
                    </button>
                    <div className="flex items-center gap-1 shrink-0 ml-2">
                      <span className="text-xs text-gray-400">{taskCount}</span>
                      <button
                        onClick={(e) => { e.stopPropagation(); setEditingProject(project); setShowProjectModal(true); }}
                        className="p-1 opacity-0 group-hover:opacity-100 hover:bg-gray-200/50 rounded transition-all"
                      >
                        <Pencil className="w-3 h-3 text-gray-400" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-100 space-y-1">
          <button onClick={exportData} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" /> 导出数据
          </button>
          <label className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">
            <Upload className="w-4 h-4" /> 导入数据
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>
        </div>
      </aside>

      {showProjectModal && (
        <ProjectModal project={editingProject} onClose={() => { setShowProjectModal(false); setEditingProject(null); }} />
      )}
    </>
  );
}
