import React from 'react';
import type { Camera } from '../types';
import { MD15342X1Camera, WLF01Camera } from './icons';

interface CameraViewProps {
  cameras: Camera[];
  selectedCameraId: number | null;
  onSelectCamera: (id: number) => void;
  pixelsPerMm: number;
}

const CameraVisual: React.FC<{ modelName: string; isSelected: boolean }> = ({ modelName, isSelected }) => {
  switch (modelName) {
    case 'MD15342X1':
      return <MD15342X1Camera isSelected={isSelected} />;
    case 'WLF01':
      return <WLF01Camera isSelected={isSelected} />;
    default:
      return null;
  }
};

const CameraView: React.FC<CameraViewProps> = ({ cameras, selectedCameraId, onSelectCamera, pixelsPerMm }) => {
  return (
    <div className="w-full h-full relative border-2 border-dashed border-gray-600 rounded-md bg-black">
      <div className="absolute top-1/2 left-1/2 transform-gpu">
        {cameras.map((camera) => (
          <div
            key={camera.id}
            className="absolute transition-transform duration-100 ease-linear cursor-pointer group"
            style={{
              width: `${camera.model.width_mm * pixelsPerMm}px`,
              height: `${camera.model.height_mm * pixelsPerMm}px`,
              transform: `translate(-50%, -50%) translate(${camera.x}px, ${camera.y}px) rotate(${camera.rotation}deg)`,
              filter: camera.id === selectedCameraId ? 'drop-shadow(0 0 8px rgba(0, 220, 220, 0.9))' : 'none',
              transition: 'filter 0.3s ease, transform 0.1s linear',
            }}
            onClick={() => onSelectCamera(camera.id)}
            title={camera.model.name}
          >
            <CameraVisual 
              modelName={camera.model.name}
              isSelected={camera.id === selectedCameraId} 
            />
            <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 text-xs bg-gray-900 text-white px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {`ID: ${camera.id} (${camera.model.name})`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CameraView;