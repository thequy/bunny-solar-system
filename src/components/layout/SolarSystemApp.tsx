'use client';

import { useState, useCallback, Suspense, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/ui/Header';
import InfoPanel from '@/components/ui/InfoPanel';
import ComparisonModal from '@/components/ui/ComparisonModal';
import QuizModal from '@/components/ui/QuizModal';
import CrossSectionModal from '@/components/ui/CrossSectionModal';
import ExoplanetView from '@/components/ui/ExoplanetView';
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
  const [showCrossSection, setShowCrossSection] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [justSelected, setJustSelected] = useState(false);

  useEffect(() => {
    const originalWarn = console.warn;
    console.warn = (...args: unknown[]) => {
      if (args[0] && typeof args[0] === 'string' && args[0].includes('THREE.Clock')) {
        return;
      }
      originalWarn.apply(console, args);
    };
    return () => {
      console.warn = originalWarn;
    };
  }, []);

  const handleViewChange = useCallback((view: ViewMode) => {
    setActiveView(view);
    if (view === 'compare') {
      setShowComparison(true);
    } else if (view === 'quiz') {
      setShowQuiz(true);
    }
  }, []);

  const handleMenuToggle = useCallback(() => {
    setShowInfoPanel(false);
    setMenuOpen(prev => !prev);
  }, []);

  const handlePlayToggle = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const handlePlanetSelect = useCallback((id: string) => {
    setSelectedPlanet(id);
    setShowInfoPanel(true);
    setJustSelected(true);
    setTimeout(() => setJustSelected(false), 300);
  }, []);

  const handleCanvasClick = useCallback(() => {
    if (!justSelected) {
      setShowInfoPanel(false);
    }
  }, [justSelected]);

  const planetData = selectedPlanet ? PLANET_DATA[selectedPlanet] : null;

  return (
    <div className="app">
      <Header 
        activeView={activeView} 
        onViewChange={handleViewChange}
        menuOpen={menuOpen}
        onMenuToggle={handleMenuToggle}
      />
      <main className="canvas-area" onClick={handleCanvasClick}>
        {activeView === 'exoplanet' ? (
          <ExoplanetView />
        ) : (
          <Suspense fallback={<div>Loading...</div>}>
            <SolarSystemScene
              onPlanetSelect={handlePlanetSelect}
              selectedPlanet={selectedPlanet}
            />
          </Suspense>
        )}
      </main>
      {showInfoPanel && (
        <InfoPanel 
          planetData={planetData} 
          onViewCrossSection={() => setShowCrossSection(true)}
          onClose={() => setShowInfoPanel(false)}
        />
      )}
      <ComparisonModal
        isOpen={showComparison}
        onClose={() => setShowComparison(false)}
      />
      <QuizModal
        isOpen={showQuiz}
        onClose={() => setShowQuiz(false)}
      />
      <CrossSectionModal
        isOpen={showCrossSection}
        onClose={() => setShowCrossSection(false)}
        planetData={planetData}
        planetId={selectedPlanet || ''}
      />
    </div>
  );
}
