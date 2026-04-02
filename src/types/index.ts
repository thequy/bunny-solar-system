export interface PlanetData {
  name: { vi: string; en: string };
  type: 'star' | 'rocky' | 'gas_giant' | 'ice_giant' | 'satellite';
  diameter: number;
  temperature: number;
  distanceFromSun: number;
  orbitalPeriod: number;
  moons: number;
  color: number;
  size: number;
  distance: number;
  speed: number;
  hasRings?: boolean;
  hasWater?: boolean;
  features: string[];
  description: { vi: string; en: string };
}

export type ViewMode = 'solar' | 'exoplanet' | 'compare' | 'quiz';
export type ToolMode = 'select' | 'measure' | 'zoom' | 'play' | 'settings';

export interface SettingsState {
  menuOpen: boolean;
  activePlanetPanel: boolean;
}
