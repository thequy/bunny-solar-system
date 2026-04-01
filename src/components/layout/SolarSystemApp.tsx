'use client';

import { useState, useCallback, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/ui/Header';
import InfoPanel from '@/components/ui/InfoPanel';
import Toolbar from '@/components/ui/Toolbar';
import ComparisonModal from '@/components/ui/ComparisonModal';
import QuizModal from '@/components/ui/QuizModal';
import { PLANET_DATA } from '@/data/planets';
import { ViewMode, ToolMode } from '@/types';

const SolarSystemScene = dynamic(
  () => import('@/components/three/SolarSystemScene'),
  { ssr: false }
);

export default function SolarSystemApp() {
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>('earth');
  const [activeView, setActiveView] = useState<ViewMode>('solar');
  const [activeTool, setActiveTool] = useState<ToolMode>('select');
  const [isPlaying, setIsPlaying] = useState(true);
  const [showComparison, setShowComparison] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  const handleViewChange = useCallback((view: ViewMode) => {
    setActiveView(view);
    if (view === 'compare') {
      setShowComparison(true);
    } else if (view === 'quiz') {
      setShowQuiz(true);
    }
  }, []);

  const handleToolChange = useCallback((tool: ToolMode) => {
    setActiveTool(tool);
  }, []);

  const handlePlayToggle = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const handlePlanetSelect = useCallback((id: string) => {
    setSelectedPlanet(id);
  }, []);

  const planetData = selectedPlanet ? PLANET_DATA[selectedPlanet] : null;

  return (
    <div className="app">
      <Header activeView={activeView} onViewChange={handleViewChange} />
      <main className="canvas-area">
        <Suspense fallback={<div>Loading...</div>}>
          <SolarSystemScene
            onPlanetSelect={handlePlanetSelect}
            selectedPlanet={selectedPlanet}
          />
        </Suspense>
      </main>
      <InfoPanel planetData={planetData} />
      <Toolbar
        activeTool={activeTool}
        isPlaying={isPlaying}
        onToolChange={handleToolChange}
        onPlayToggle={handlePlayToggle}
      />
      <ComparisonModal
        isOpen={showComparison}
        onClose={() => setShowComparison(false)}
      />
      <QuizModal
        isOpen={showQuiz}
        onClose={() => setShowQuiz(false)}
      />
    </div>
  );
}
