import { STORAGE_KEY, DEFAULT_PROJECTS, DEFAULT_TASKS } from '../constants/index.js';

export function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        projects: parsed.projects || DEFAULT_PROJECTS,
        tasks: parsed.tasks || DEFAULT_TASKS,
      };
    }
  } catch (e) {
    console.error('Failed to load data', e);
  }
  return { projects: DEFAULT_PROJECTS, tasks: DEFAULT_TASKS };
}

export function saveData(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ projects: state.projects, tasks: state.tasks }));
  } catch (e) {
    console.error('Failed to save data', e);
  }
}

export function exportToJSON(projects, tasks) {
  const data = { projects, tasks, exportedAt: new Date().toISOString() };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `taskflow-backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function importFromJSON(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.projects && data.tasks) {
          resolve(data);
        } else {
          reject(new Error('Invalid file format'));
        }
      } catch (err) {
        reject(err);
      }
    };
    reader.readAsText(file);
  });
}
