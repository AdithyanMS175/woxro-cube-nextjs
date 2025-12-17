export interface CubePosition {
  top: number;
  left: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  z: number;
}

export interface CubeData {
  initial: CubePosition;
  final: CubePosition;
}

export interface CubesData {
  [key: string]: CubeData;
}