
import React from 'react';
import type { Camera, CameraModel } from '../types';

interface ControlPanelProps {
  numCameras: number;
  setNumCameras: (num: number) => void;
  gridSpacingX: number;
  setGridSpacingX: (spacing: number) => void;
  gridSpacingY: number;
  setGridSpacingY: (spacing: number) => void;
  selectedCamera: Camera | null;
  availableModels: CameraModel[];
  onUpdateCamera: (id: number, updatedProps: Partial<Omit<Camera, 'id' | 'model'>> & { modelName?: string }) => void;
  onExport: () => void;
}

// A virtual scale for the display. The UI will work in mm, but the view uses pixels.
const PIXELS_PER_MM = 2;

const SliderControl: React.FC<{
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  unit?: string;
}> = ({ label, value, onChange, min, max, step, unit }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <label className="text-sm font-medium text-gray-300">{label}</label>
      <span className="text-sm bg-gray-700 px-2 py-1 rounded-md w-24 text-center">
        {value.toFixed(1)} {unit}
      </span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
    />
  </div>
);

const ControlPanel: React.FC<ControlPanelProps> = ({
  numCameras,
  setNumCameras,
  gridSpacingX,
  setGridSpacingX,
  gridSpacingY,
  setGridSpacingY,
  selectedCamera,
  availableModels,
  onUpdateCamera,
  onExport,
}) => {

  const handleRotate = (direction: 'cw' | 'ccw') => {
    if (!selectedCamera) return;
    const currentRotation = selectedCamera.rotation;
    let newRotation;
    if (direction === 'cw') {
      newRotation = (currentRotation + 90) % 360;
    } else {
      newRotation = (currentRotation - 90 + 360) % 360;
    }
    onUpdateCamera(selectedCamera.id, { rotation: newRotation });
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="space-y-4 pb-6 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-cyan-400">Assembly Settings</h2>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Number of Cameras</label>
          <div className="flex items-center space-x-2 bg-gray-700 p-1 rounded-md">
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                onClick={() => setNumCameras(num)}
                className={`flex-1 py-1 text-sm rounded ${
                  numCameras === num ? 'bg-cyan-600 text-white font-bold' : 'hover:bg-gray-600'
                } transition-colors`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
        <SliderControl 
          label="Grid Spacing X"
          value={gridSpacingX}
          onChange={setGridSpacingX}
          min={25}
          max={200}
          step={5}
          unit="mm"
        />
        <SliderControl 
          label="Grid Spacing Y"
          value={gridSpacingY}
          onChange={setGridSpacingY}
          min={25}
          max={200}
          step={5}
          unit="mm"
        />
      </div>

      <div className="flex-grow space-y-4">
        <h2 className="text-lg font-semibold text-cyan-400">Selected Camera (ID: {selectedCamera?.id ?? 'None'})</h2>
        {selectedCamera ? (
          <div className="space-y-4 bg-gray-900/50 p-4 rounded-lg">
            <div className="space-y-2">
              <label htmlFor="camera-model" className="text-sm font-medium text-gray-300">Camera Model</label>
              <select
                id="camera-model"
                value={selectedCamera.model.name}
                onChange={(e) => onUpdateCamera(selectedCamera.id, { modelName: e.target.value })}
                className="w-full bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block p-2.5"
              >
                {availableModels.map(model => (
                  <option key={model.name} value={model.name}>
                    {model.name}
                  </option>
                ))}
              </select>
            </div>
            <SliderControl 
              label="Position X"
              value={selectedCamera.x / PIXELS_PER_MM}
              onChange={(val) => onUpdateCamera(selectedCamera.id, { x: val * PIXELS_PER_MM })}
              min={-250}
              max={250}
              step={0.5}
              unit="mm"
            />
             <SliderControl 
              label="Position Y"
              value={selectedCamera.y / PIXELS_PER_MM}
              onChange={(val) => onUpdateCamera(selectedCamera.id, { y: val * PIXELS_PER_MM })}
              min={-250}
              max={250}
              step={0.5}
              unit="mm"
            />
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-300">Rotation</label>
                <span className="text-sm bg-gray-700 px-2 py-1 rounded-md w-24 text-center">
                  {selectedCamera.rotation}°
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleRotate('ccw')}
                  className="flex-1 py-2 text-sm rounded bg-gray-600 hover:bg-gray-500 transition-colors"
                  aria-label="Rotate 90 degrees counter-clockwise"
                >
                  -90° (CCW)
                </button>
                <button
                  onClick={() => handleRotate('cw')}
                  className="flex-1 py-2 text-sm rounded bg-gray-600 hover:bg-gray-500 transition-colors"
                  aria-label="Rotate 90 degrees clockwise"
                >
                  +90° (CW)
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-48 bg-gray-900/50 rounded-lg">
            <p className="text-gray-500">Click a camera in the view to select it.</p>
          </div>
        )}
      </div>

      <div className="pt-6 border-t border-gray-700">
        <button
          onClick={onExport}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
        >
          Generate Maxwell Configuration
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
