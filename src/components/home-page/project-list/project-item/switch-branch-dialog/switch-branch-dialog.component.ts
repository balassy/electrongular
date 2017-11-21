import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { DialogParams, DialogResult } from './switch-branch-dialog.types';

@Component({
  selector: 'app-switch-branch-dialog',
  styleUrls: ['./components/home-page/project-list/project-item/switch-branch-dialog/switch-branch-dialog.component.css'],
  templateUrl: './components/home-page/project-list/project-item/switch-branch-dialog/switch-branch-dialog.component.html'
})
export class SwitchBranchDialog implements OnInit {
  public branchName: string;

  public currentBranchName: string;

  public remoteBranchNames: string[];

  public constructor(private _dialogRef: MatDialogRef<SwitchBranchDialog>,
                     @Inject(MAT_DIALOG_DATA) private _params: DialogParams) {
  }

  public ngOnInit(): void {
    this.remoteBranchNames = this._params.remoteBranchNames;
    this.currentBranchName = this._params.currentBranchName;
    this.branchName = this._params.currentBranchName;
  }

  public onSwitchAndGetLatestButtonClicked(): void {
    this._closeDialog({ getLatest: true });
  }

  public onSwitchButtonClicked(): void {
    this._closeDialog({ getLatest: false });
  }

  private _closeDialog({ getLatest }: { getLatest: boolean }): void {
    this._dialogRef.close(<DialogResult> {
      selectedBranchName: this.branchName,
      getLatest
    });
  }
}
