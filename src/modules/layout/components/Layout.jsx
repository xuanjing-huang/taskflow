import Sidebar from './Sidebar.jsx';
import Header from './Header.jsx';
import { useMobileSidebar } from '../hooks/useMobileSidebar.js';

export default function Layout({ children }) {
  const { isOpen, open, close } = useMobileSidebar();

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar isOpen={isOpen} onClose={close} />
      <main className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={open} />
        <div className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
