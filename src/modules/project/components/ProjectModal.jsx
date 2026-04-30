import { useState } from 'react';
import { useTaskStore } from '../../../core/store/useTaskStore.js';
import ModalShell from '../../../shared/components/ModalShell.jsx';
import { PRESET_COLORS } from '../../../core/constants/index.js';
import { Folder, Palette } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  const { dispatch } = useTaskStore();
  const isEdit = !!project;
  const [name, setName] = useState(project?.name || '');
  const [color, setColor] = useState(project?.color || PRESET_COLORS[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    if (isEdit) {
      dispatch({ type: 'UPDATE_PROJECT', payload: { id: project.id, data: { name, color } } });
    } else {
      dispatch({ type: 'ADD_PROJECT', payload: { name, color } });
    }
    onClose();
  };

  return (
    <ModalShell title={isEdit ? '编辑项目' : '新建项目'} onClose={onClose} maxWidth="max-w-md">
      <form onSubmit={handleSubmit} className="p-5 space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
            <Folder className="w-3.5 h-3.5 text-gray-400" /> 项目名称 <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="输入项目名称..."
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            autoFocus
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-gray-400" /> 主题颜色
          </label>
          <div className="flex flex-wrap gap-2">
            {PRESET_COLORS.map(c => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${color === c ? 'border-gray-800 scale-110' : 'border-transparent'}`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">取消</button>
          <button
            type="submit"
            disabled={!name.trim()}
            className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isEdit ? '保存修改' : '创建项目'}
          </button>
        </div>
      </form>
    </ModalShell>
  );
}
