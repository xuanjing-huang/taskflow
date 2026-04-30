import { useTaskStore } from '../../../core/store/useTaskStore.js';
import ModalShell from '../../../shared/components/ModalShell.jsx';
import ProjectSelect from '../../../shared/components/ProjectSelect.jsx';
import { useTaskForm } from '../hooks/useTaskForm.js';
import { Calendar, Flag, AlignLeft, Type } from 'lucide-react';

export default function TaskModal({ projectId, task, onClose }) {
  const { dispatch } = useTaskStore();
  const { form, isEdit, isValid, updateField } = useTaskForm({ task, projectId });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    if (isEdit) {
      dispatch({ type: 'UPDATE_TASK', payload: { id: task.id, data: form } });
    } else {
      dispatch({ type: 'ADD_TASK', payload: form });
    }
    onClose();
  };

  return (
    <ModalShell title={isEdit ? '编辑任务' : '新建任务'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="p-5 space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
            <Type className="w-3.5 h-3.5 text-gray-400" /> 任务标题 <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="输入任务标题..."
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            autoFocus
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
            <AlignLeft className="w-3.5 h-3.5 text-gray-400" /> 描述
          </label>
          <textarea
            value={form.description}
            onChange={(e) => updateField('description', e.target.value)}
            placeholder="添加任务描述（可选）..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">所属项目</label>
            <ProjectSelect value={form.projectId} onChange={(v) => updateField('projectId', v)} />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-gray-400" /> 截止日期
            </label>
            <input
              type="date"
              value={form.dueDate}
              onChange={(e) => updateField('dueDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
              <Flag className="w-3.5 h-3.5 text-gray-400" /> 优先级
            </label>
            <select
              value={form.priority}
              onChange={(e) => updateField('priority', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="high">高优先级</option>
              <option value="medium">中优先级</option>
              <option value="low">低优先级</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">状态</label>
            <select
              value={form.status}
              onChange={(e) => updateField('status', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="todo">待办</option>
              <option value="in-progress">进行中</option>
              <option value="done">已完成</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">取消</button>
          <button
            type="submit"
            disabled={!isValid}
            className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isEdit ? '保存修改' : '创建任务'}
          </button>
        </div>
      </form>
    </ModalShell>
  );
}
