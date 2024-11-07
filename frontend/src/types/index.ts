export interface Emotion {
  angry: number;
  disgust: number;
  fear: number;
  happy: number;
  neutral: number;
  sad: number;
  surprise: number;
}

export interface Region {
  h: number;
  left_eye: [number, number];
  right_eye: [number, number];
  w: number;
  x: number;
  y: number;
}

export interface Face {
  dominant_emotion: string;
  emotion: Emotion;
  face_confidence: number;
  region: Region;
}

export interface Response {
  faces: Face[][];
}
