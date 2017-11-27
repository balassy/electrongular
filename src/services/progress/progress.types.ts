export enum ProgressStatus {
  Idle,
  Working
}

export interface ProgressState {
  message?: string;
  status: ProgressStatus;
}
