import { useState, useCallback } from 'react';

export function useDragAndDrop(onDrop) {
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);

  const handleDragStart = useCallback((e, taskId) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleDragOver = useCallback((e, columnId) => {
    e.preventDefault();
    setDragOverColumn(columnId);
  }, []);

  const handleDrop = useCallback((e, columnId) => {
    e.preventDefault();
    if (draggedTaskId) {
      onDrop(draggedTaskId, columnId);
    }
    setDraggedTaskId(null);
    setDragOverColumn(null);
  }, [draggedTaskId, onDrop]);

  return { draggedTaskId, dragOverColumn, handleDragStart, handleDragOver, handleDrop };
}
