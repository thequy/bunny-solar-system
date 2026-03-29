'use client';

import { ToolMode } from '@/types';

interface ToolbarProps {
  activeTool: ToolMode;
  isPlaying: boolean;
  onToolChange: (tool: ToolMode) => void;
  onPlayToggle: () => void;
}

export default function Toolbar({ activeTool, isPlaying, onToolChange, onPlayToggle }: ToolbarProps) {
  const tools: { id: ToolMode; icon: string; label: string }[] = [
    { id: 'select', icon: '👆', label: 'Chọn hành tinh' },
    { id: 'measure', icon: '📏', label: 'Đo khoảng cách' },
    { id: 'zoom', icon: '🔍', label: 'Zoom' },
    { id: 'play', icon: isPlaying ? '⏸️' : '▶️', label: isPlaying ? 'Tạm dừng' : 'Chơi tiếp' },
    { id: 'settings', icon: '⚙️', label: 'Cài đặt' },
  ];

  return (
    <footer className="toolbar">
      {tools.map((tool) => (
        <button
          key={tool.id}
          className={`tool-btn ${activeTool === tool.id ? 'active' : ''}`}
          onClick={() => {
            if (tool.id === 'play') {
              onPlayToggle();
            } else {
              onToolChange(tool.id);
            }
          }}
        >
          {tool.icon} {tool.label}
        </button>
      ))}
    </footer>
  );
}
