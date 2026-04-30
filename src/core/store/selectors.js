import { getTodayISO } from '../utils/date.js';

export function createSelectors(state) {
  return {
    getFilteredTasks(projectId) {
      let tasks = state.tasks;
      if (projectId) {
        tasks = tasks.filter(t => t.projectId === projectId);
      }
      if (state.filter.status !== 'all') {
        tasks = tasks.filter(t => t.status === state.filter.status);
      }
      if (state.filter.priority !== 'all') {
        tasks = tasks.filter(t => t.priority === state.filter.priority);
      }
      if (state.searchQuery) {
        const q = state.searchQuery.toLowerCase();
        tasks = tasks.filter(
          t => t.title.toLowerCase().includes(q) || (t.description || '').toLowerCase().includes(q)
        );
      }

      const sortBy = state.filter.sortBy;
      tasks = [...tasks].sort((a, b) => {
        if (sortBy === 'dueDate') {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        }
        if (sortBy === 'priority') {
          const map = { high: 3, medium: 2, low: 1 };
          return map[b.priority] - map[a.priority];
        }
        if (sortBy === 'createdAt') {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        return 0;
      });
      return tasks;
    },

    getTaskStats() {
      const today = getTodayISO();
      return {
        total: state.tasks.length,
        completed: state.tasks.filter(t => t.status === 'done').length,
        overdue: state.tasks.filter(t => t.dueDate && t.dueDate < today && t.status !== 'done').length,
        todayDue: state.tasks.filter(t => t.dueDate === today && t.status !== 'done').length,
      };
    },
  };
}
