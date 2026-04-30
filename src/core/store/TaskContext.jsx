import React, { createContext, useReducer, useEffect, useCallback } from 'react';
import { loadData, saveData } from './persistence.js';
import { taskReducer, initialUIState } from './reducer.js';
import { createSelectors } from './selectors.js';
import { exportToJSON, importFromJSON } from './persistence.js';

const initialState = {
  ...loadData(),
  ...initialUIState,
};

export const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    saveData(state);
  }, [state.projects, state.tasks]);

  const selectors = useCallback(() => createSelectors(state), [state]);

  const exportData = useCallback(() => {
    exportToJSON(state.projects, state.tasks);
  }, [state.projects, state.tasks]);

  const importData = useCallback(async (file) => {
    const data = await importFromJSON(file);
    dispatch({ type: 'IMPORT_DATA', payload: data });
  }, []);

  const value = {
    state,
    dispatch,
    getFilteredTasks: (...args) => selectors().getFilteredTasks(...args),
    getTaskStats: () => selectors().getTaskStats(),
    exportData,
    importData,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
