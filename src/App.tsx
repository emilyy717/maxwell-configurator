
import React, { useState, useEffect, useCallback } from 'react';
import type { Camera, CameraModel } from './types';
import CameraView from './components/CameraView';
import ControlPanel from './components/ControlPanel';
import ExportModal from './components/ExportModal';

// Mock database of available camera models.
// This simulates reading from a library folder.
const CAMERA_MODELS: CameraModel[] = [
  { name: 'MD15342X1', componentFile: 'md15342x1_assy.a3dcomp' },
  { name: 'WLF01', componentFile: 'wlf01_assy.a3dcomp' },
  { name: 'Generic-Wide', componentFile: 'generic_wide_angle_v3.a3dcomp' },
];

const PIXELS_PER_MM = 2;

const App: React.FC = () => {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [selectedCameraId, setSelectedCameraId] = useState<number | null>(null);
  const [numCameras, setNumCameras] = useState<number>(2);
  const [gridSpacingX, setGridSpacingX] = useState<number>(75); // Now in mm for X
  const [gridSpacingY, setGridSpacingY] = useState<number>(75); // Now in mm for Y
  const [showExportModal, setShowExportModal] = useState<boolean>(false);

  useEffect(() => {
    const newCameras: Camera[] = [];
    const positions: { x: number; y: number }[] = [];
    const spacingXInPixels = gridSpacingX * PIXELS_PER_MM;
    const spacingYInPixels = gridSpacingY * PIXELS_PER_MM;
    
    switch (numCameras) {
      case 1:
        positions.push({ x: 0, y: 0 });
        break;
      case 2:
        positions.push({ x: -spacingXInPixels, y: 0 });
        positions.push({ x: spacingXInPixels, y: 0 });
        break;
      case 3:
        positions.push({ x: -spacingXInPixels, y: -spacingYInPixels });
        positions.push({ x: spacingXInPixels, y: -spacingYInPixels });
        positions.push({ x: 0, y: spacingYInPixels });
        break;
      case 4:
        positions.push({ x: -spacingXInPixels, y: -spacingYInPixels });
        positions.push({ x: spacingXInPixels, y: -spacingYInPixels });
        positions.push({ x: -spacingXInPixels, y: spacingYInPixels });
        positions.push({ x: spacingXInPixels, y: spacingYInPixels });
        break;
    }

    for (let i = 0; i < numCameras; i++) {
      newCameras.push({
        id: i + 1,
        x: positions[i].x,
        y: positions[i].y,
        rotation: 0,
        model: CAMERA_MODELS[0], // Assign a default model
      });
    }
    setCameras(newCameras);
    setSelectedCameraId(newCameras.length > 0 ? 1 : null);
  }, [numCameras, gridSpacingX, gridSpacingY]);

  const handleSelectCamera = (id: number) => {
    setSelectedCameraId(id);
  };

  const handleUpdateCamera = useCallback((id: number, updatedProps: Partial<Omit<Camera, 'id' | 'model'>> & { modelName?: string }) => {
    setCameras(prevCameras =>
      prevCameras.map(camera => {
        if (camera.id === id) {
          const newCamera = { ...camera, ...updatedProps };
          if (updatedProps.modelName) {
            const newModel = CAMERA_MODELS.find(m => m.name === updatedProps.modelName);
            if (newModel) {
              newCamera.model = newModel;
            }
          }
          return newCamera;
        }
        return camera;
      })
    );
  }, []);
  
  const selectedCamera = cameras.find(c => c.id === selectedCameraId) || null;

  // Prepare a clean config for export, removing the internal model object structure if needed
  // For now, we export the whole structure, which is more informative.
  const exportConfig = cameras.map(({ id, x, y, rotation, model }) => ({
    id,
    model: model.name,
    componentFile: model.componentFile,
    x: parseFloat((x / PIXELS_PER_MM).toFixed(2)),
    y: parseFloat((y / PIXELS_PER_MM).toFixed(2)),
    rotation: parseFloat(rotation.toFixed(2)),
  }));

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col">
      <header className="bg-gray-800 shadow-lg p-4">
        <h1 className="text-2xl font-bold text-cyan-400">Ansys Maxwell Assembly Configurator</h1>
        <p className="text-gray-400">Visually set up camera positions and rotations for simulation.</p>
      </header>
      
      <main className="flex-grow flex flex-col md:flex-row p-4 gap-4 overflow-hidden">
        <div className="flex-grow md:w-2/3 lg:w-3/4 bg-gray-800 rounded-lg shadow-inner p-4 flex items-center justify-center relative overflow-hidden">
          <CameraView 
            cameras={cameras} 
            selectedCameraId={selectedCameraId} 
            onSelectCamera={handleSelectCamera} 
          />
        </div>
        
        <aside className="md:w-1/3 lg:w-1/4 bg-gray-800 rounded-lg shadow-lg p-6 overflow-y-auto">
          <ControlPanel
            numCameras={numCameras}
            setNumCameras={setNumCameras}
            gridSpacingX={gridSpacingX}
            setGridSpacingX={setGridSpacingX}
            gridSpacingY={gridSpacingY}
            setGridSpacingY={setGridSpacingY}
            selectedCamera={selectedCamera}
            availableModels={CAMERA_MODELS}
            onUpdateCamera={handleUpdateCamera}
            onExport={() => setShowExportModal(true)}
          />
        </aside>
      </main>

      {showExportModal && (
        <ExportModal 
          cameraConfig={exportConfig}
          onClose={() => setShowExportModal(false)}
        />
      )}
    </div>
  );
};

export default App;
