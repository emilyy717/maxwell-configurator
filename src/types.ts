export interface CameraModel {
  name: string;
  componentFile: string;
  width_mm: number;
  height_mm: number;
}

export interface Camera {
  id: number;
  x: number;
  y: number;
  rotation: number;
  model: CameraModel;
}