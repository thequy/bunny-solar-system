'use client';

import { ViewMode } from '@/types';

interface HeaderProps {
  activeView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  menuOpen?: boolean;
  onMenuToggle?: () => void;
}

export default function Header({ activeView, onViewChange, menuOpen, onMenuToggle }: HeaderProps) {
  const views: { id: ViewMode; label: string; icon: string }[] = [
    { id: 'solar', label: 'Hệ Mặt Trời', icon: '🌍' },
    { id: 'exoplanet', label: 'Exoplanets', icon: '🔭' },
    { id: 'compare', label: 'So sánh', icon: '📊' },
    { id: 'quiz', label: 'Quiz', icon: '❓' },
  ];

  return (
    <>
      <header className="header">
        <div className="logo">
          <img src="/logo-02.png" alt="Logo" className="logo-img" />
          <span className="logo-text">Solar Explorer</span>
        </div>
        <button className="menu-toggle" onClick={onMenuToggle}>
          ☰
        </button>
      </header>
      <nav className={`nav ${menuOpen ? 'open' : ''}`}>
        <button className="close-menu-btn" onClick={onMenuToggle}>×</button>
        {views.map((view) => (
          <button
            key={view.id}
            className={`nav-btn ${activeView === view.id ? 'active' : ''}`}
            onClick={() => {
              onViewChange(view.id);
              onMenuToggle?.();
            }}
          >
            {view.icon} {view.label}
          </button>
        ))}
        <button className="nav-btn settings-btn" onClick={onMenuToggle}>
          ⚙️ Cài đặt
        </button>
      </nav>
    </>
  );
}
