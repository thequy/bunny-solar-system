'use client';

import { ViewMode } from '@/types';

interface HeaderProps {
  activeView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export default function Header({ activeView, onViewChange }: HeaderProps) {
  const views: { id: ViewMode; label: string }[] = [
    { id: 'solar', label: 'Hệ Mặt Trời' },
    { id: 'exoplanet', label: 'Exoplanets' },
    { id: 'compare', label: 'So sánh' },
    { id: 'quiz', label: 'Quiz' },
  ];

  return (
    <header className="header">
      <div className="logo">
        <img src="/logo.png" alt="Logo" className="logo-img" />
        <span className="logo-text">Solar System Explorer</span>
      </div>
      <nav className="nav">
        {views.map((view) => (
          <button
            key={view.id}
            className={`nav-btn ${activeView === view.id ? 'active' : ''}`}
            onClick={() => onViewChange(view.id)}
          >
            {view.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
