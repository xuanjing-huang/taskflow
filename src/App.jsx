import { useTaskStore } from './core/store/useTaskStore.js';
import Layout from './modules/layout/components/Layout.jsx';
import Dashboard from './modules/dashboard/components/Dashboard.jsx';
import ProjectBoard from './modules/projectBoard/components/ProjectBoard.jsx';

function App() {
  const { state } = useTaskStore();

  return (
    <Layout>
      {state.currentView === 'dashboard' ? (
        <Dashboard />
      ) : (
        <ProjectBoard projectId={state.currentView.projectId} />
      )}
    </Layout>
  );
}

export default App;
