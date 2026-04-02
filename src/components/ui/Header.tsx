'use client';

import { ViewMode } from '@/types';

interface HeaderProps {
  activeView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  menuOpen?: boolean;
  onMenuToggle?: () => void;
}

export default function Header({ activeView, onViewChange, menuOpen, onMenuToggle }: HeaderProps) {
  const views: { id: ViewMode; label: string }[] = [
    { id: 'solar', label: 'Hệ Mặt Trời' },
    { id: 'exoplanet', label: 'Exoplanets' },
    { id: 'compare', label: 'So sánh' },
    { id: 'quiz', label: 'Quiz' },
  ];

  return (
    <header className="header">
      <div className="logo">
        <img src="/logo-02.png" alt="Logo" className="logo-img" />
        <span className="logo-text">Solar System Explorer</span>
      </div>
      <button className="menu-toggle" onClick={onMenuToggle}>
        ☰
      </button>
      <nav className={`nav ${menuOpen ? 'open' : ''}`}>
        {views.map((view) => (
          <button
            key={view.id}
            className={`nav-btn ${activeView === view.id ? 'active' : ''}`}
            onClick={() => {
              onViewChange(view.id);
              onMenuToggle?.();
            }}
          >
            {view.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
