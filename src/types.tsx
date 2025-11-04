
export interface CameraModel {
  name: string;
  componentFile: string;
}

export interface Camera {
  id: number;
  x: number;
  y: number;
  rotation: number;
  model: CameraModel;
}
