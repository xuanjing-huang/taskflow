import { useTaskStore } from '../../core/store/useTaskStore.js';

export default function ProjectSelect({ value, onChange }) {
  const { state } = useTaskStore();
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
    >
      {state.projects.map(p => (
        <option key={p.id} value={p.id}>{p.name}</option>
      ))}
    </select>
  );
}
