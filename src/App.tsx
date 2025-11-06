



import React, { useState, useEffect, useCallback } from 'react';
import type { Camera, CameraModel } from './types';
import CameraView from './components/CameraView';
import ControlPanel from './components/ControlPanel';
import ExportModal from './components/ExportModal';

const CAMERA_MODELS: CameraModel[] = [
  { name: 'MD15342X1', componentFile: 'MD15342X1.a3dcomp', width_mm: 14.81, height_mm: 12.21 },
  { name: 'WLF01', componentFile: 'WLF01.a3dcomp', width_mm: 10.96, height_mm: 10.96 },
];

const PIXELS_PER_MM = 10;

const App: React.FC = () => {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [selectedCameraId, setSelectedCameraId] = useState<number | null>(null);
  const [numCameras, setNumCameras] = useState<number>(2);
  const [gridSpacingX, setGridSpacingX] = useState<number>(20);
  const [gridSpacingY, setGridSpacingY] = useState<number>(20);
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
        positions.push({ x: -spacingXInPixels / 2, y: 0 });
        positions.push({ x: spacingXInPixels / 2, y: 0 });
        break;
      case 3:
        positions.push({ x: -spacingXInPixels / 2, y: -spacingYInPixels / 2 });
        positions.push({ x: spacingXInPixels / 2, y: -spacingYInPixels / 2 });
        positions.push({ x: -spacingXInPixels / 2, y: spacingYInPixels / 2 });
        break;
      case 4:
        positions.push({ x: -spacingXInPixels / 2, y: -spacingYInPixels / 2 });
        positions.push({ x: spacingXInPixels / 2, y: -spacingYInPixels / 2 });
        positions.push({ x: -spacingXInPixels / 2, y: spacingYInPixels / 2 });
        positions.push({ x: spacingXInPixels / 2, y: spacingYInPixels / 2 });
        break;
    }

    // Keep existing camera models and rotations if possible
    const existingCameras = new Map(cameras.map(c => [c.id, c]));
    for (let i = 0; i < numCameras; i++) {
      const existingCam = existingCameras.get(i + 1);
      newCameras.push({
        id: i + 1,
        x: positions[i]?.x ?? 0,
        y: positions[i]?.y ?? 0,
        rotation: existingCam?.rotation ?? 0,
        model: existingCam?.model || CAMERA_MODELS[0],
      });
    }

    setCameras(newCameras);
    if (!newCameras.some(c => c.id === selectedCameraId)) {
        setSelectedCameraId(newCameras.length > 0 ? 1 : null);
    }
  // This effect should ONLY run when these specific inputs change.
  // The previous dependency on `cameras` was causing an infinite loop.
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
          delete (newCamera as any).modelName;
          return newCamera;
        }
        return camera;
      })
    );
  }, []);
  
  const selectedCamera = cameras.find(c => c.id === selectedCameraId) || null;

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
            pixelsPerMm={PIXELS_PER_MM}
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
            pixelsPerMm={PIXELS_PER_MM}
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
