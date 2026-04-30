export function getTodayISO() {
  return new Date().toISOString().split('T')[0];
}

export function isOverdue(dueDate, status) {
  if (!dueDate || status === 'done') return false;
  return dueDate < getTodayISO();
}
