import { generateId } from '../utils/id.js';

export const initialUIState = {
  currentView: 'dashboard',
  filter: { status: 'all', priority: 'all', sortBy: 'dueDate' },
  searchQuery: '',
};

export function taskReducer(state, action) {
  switch (action.type) {
    case 'SET_VIEW':
      return { ...state, currentView: action.payload };
    case 'SET_FILTER':
      return { ...state, filter: { ...state.filter, ...action.payload } };
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload };

    case 'ADD_PROJECT': {
      const newProject = { ...action.payload, id: generateId(), createdAt: new Date().toISOString() };
      return { ...state, projects: [...state.projects, newProject] };
    }
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map(p =>
          p.id === action.payload.id ? { ...p, ...action.payload.data } : p
        ),
      };
    case 'DELETE_PROJECT': {
      const projectId = action.payload;
      return {
        ...state,
        projects: state.projects.filter(p => p.id !== projectId),
        tasks: state.tasks.filter(t => t.projectId !== projectId),
        currentView: state.currentView?.projectId === projectId ? 'dashboard' : state.currentView,
      };
    }

    case 'ADD_TASK': {
      const newTask = { ...action.payload, id: generateId(), createdAt: new Date().toISOString() };
      return { ...state, tasks: [...state.tasks, newTask] };
    }
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(t =>
          t.id === action.payload.id
            ? { ...t, ...action.payload.data, updatedAt: new Date().toISOString() }
            : t
        ),
      };
    case 'DELETE_TASK':
      return { ...state, tasks: state.tasks.filter(t => t.id !== action.payload) };
    case 'MOVE_TASK_STATUS': {
      const { taskId, status } = action.payload;
      return {
        ...state,
        tasks: state.tasks.map(t =>
          t.id === taskId ? { ...t, status, updatedAt: new Date().toISOString() } : t
        ),
      };
    }

    case 'IMPORT_DATA':
      return { ...state, projects: action.payload.projects, tasks: action.payload.tasks };

    default:
      return state;
  }
}
