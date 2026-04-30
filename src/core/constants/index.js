export const STORAGE_KEY = 'taskflow_data_v1';

export const DEFAULT_PROJECTS = [
  { id: 'default', name: '个人任务', color: '#4f46e5', createdAt: new Date().toISOString() },
  { id: 'work', name: '工作任务', color: '#0ea5e9', createdAt: new Date().toISOString() },
];

export const DEFAULT_TASKS = [
  { id: 't1', title: '欢迎使用 TaskFlow', description: '这是一个示例任务，你可以编辑或删除它。', projectId: 'default', priority: 'medium', status: 'todo', dueDate: new Date().toISOString().split('T')[0], createdAt: new Date().toISOString() },
  { id: 't2', title: '尝试拖拽任务', description: '在看板视图中，你可以拖拽任务到不同状态列。', projectId: 'default', priority: 'high', status: 'in-progress', dueDate: new Date().toISOString().split('T')[0], createdAt: new Date().toISOString() },
];

export const COLUMNS = [
  { id: 'todo', name: '待办', color: 'bg-gray-100', borderColor: 'border-gray-200' },
  { id: 'in-progress', name: '进行中', color: 'bg-blue-50', borderColor: 'border-blue-200' },
  { id: 'done', name: '已完成', color: 'bg-green-50', borderColor: 'border-green-200' },
];

export const PRIORITY_CONFIG = {
  high: { label: '高', color: 'text-danger bg-red-50' },
  medium: { label: '中', color: 'text-warning bg-amber-50' },
  low: { label: '低', color: 'text-success bg-green-50' },
};

export const STATUS_LABELS = {
  todo: '待办',
  'in-progress': '进行中',
  done: '已完成',
};

export const STATUS_COLORS = {
  todo: 'bg-gray-100 text-gray-600',
  'in-progress': 'bg-blue-100 text-blue-700',
  done: 'bg-green-100 text-green-700',
};

export const PRESET_COLORS = [
  '#4f46e5', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444',
  '#8b5cf6', '#ec4899', '#6366f1', '#14b8a6', '#f97316',
];
