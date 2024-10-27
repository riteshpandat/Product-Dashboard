import React from 'react';
import { LayoutDashboard, Package, Menu } from 'lucide-react';

const Navigation = ({ currentView, onViewChange, isMobile, isOpen, onToggle }) => {
  const menuItems = [
    {
      id: 'products',
      label: 'Products',
      icon: Package,
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: LayoutDashboard,
    }
  ];

  const handleViewChange = (viewId) => {
    if (typeof onViewChange === 'function') {
      onViewChange(viewId);
      if (isMobile) {
        onToggle();
      }
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={onToggle}
          className="fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow"
        >
          <Menu size={24} />
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-white w-64 shadow-lg transform transition-transform duration-300 z-40
          ${isOpen || !isMobile ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
          <nav className="space-y-4">
            {menuItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => handleViewChange(id)}
                className={`flex items-center gap-2 w-full p-2 rounded transition-colors
                  ${currentView === id 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'hover:bg-gray-100 text-gray-700'}`}
              >
                <Icon size={20} />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={onToggle}
        />
      )}
    </>
  );
};

export default Navigation;