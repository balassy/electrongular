export interface DialogParams {
  currentBranchName: string;
  remoteBranchNames: string[];
}

export interface DialogResult {
  getLatest: boolean;
  selectedBranchName: string;
}
