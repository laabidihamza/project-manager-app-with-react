// components/layout/Sidebar.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiFolder, FiCalendar, FiUsers, FiSettings, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './layout.css';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const navItems = [
    { path: '/', icon: <FiHome />, text: 'Dashboard' },
    { path: '/projects', icon: <FiFolder />, text: 'Projects' },
    { path: '/calendar', icon: <FiCalendar />, text: 'Calendar' },
    { path: '/team', icon: <FiUsers />, text: 'Team' },
    { path: '/settings', icon: <FiSettings />, text: 'Settings' },
  ];

  return (
    <>
      {/* Mobile overlay (only visible on small screens) */}
      {mobileOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar component */}
      <aside className={`app-sidebar ${collapsed ? 'sidebar-collapsed' : ''} ${mobileOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          {!collapsed && <h3>Menu</h3>}
          <button 
            className="collapse-button tooltip" 
            onClick={toggleSidebar}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
            {collapsed && <span className="tooltip-text">Expand</span>}
          </button>
        </div>

        <nav className="nav-menu">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) => 
                `nav-item ${isActive ? 'active' : ''}`
              }
              end
              onClick={() => setMobileOpen(false)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">{item.text}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          {!collapsed && (
            <div className="user-info">
              <p className="user-name">John Doe</p>
              <p className="user-role">Admin</p>
            </div>
          )}
          {collapsed && (
            <div className="user-avatar-small">
              JD
            </div>
          )}
        </div>
      </aside>

      {/* Mobile menu button (only visible on small screens) */}
      <button 
        className="mobile-menu-button" 
        onClick={() => setMobileOpen(true)}
      >
        <FiChevronRight />
      </button>
    </>
  );
};

export default Sidebar;