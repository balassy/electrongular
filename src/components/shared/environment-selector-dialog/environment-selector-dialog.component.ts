import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Environment } from './../../../models/environment';
import { EnvironmentService } from './../../../services/environment/environment.service';
import { EnvironmentSelectorDialogParams, EnvironmentSelectorDialogResult } from './environment-selector-dialog.types';

@Component({
  selector: 'app-environment-selector-dialog',
  styleUrls: ['./components/shared/environment-selector-dialog/environment-selector-dialog.component.css'],
  templateUrl: './components/shared/environment-selector-dialog/environment-selector-dialog.component.html'
})
export class EnvironmentSelectorDialogComponent implements OnInit {
  public currentEnv: Environment;
  public envs: Environment[];
  public selectedEnv: Environment;

  public constructor(private _envService: EnvironmentService,
                     private _dialogRef: MatDialogRef<EnvironmentSelectorDialogComponent>,
                     @Inject(MAT_DIALOG_DATA) private _params: EnvironmentSelectorDialogParams) {
  }

  public ngOnInit(): void {
    this.envs = this._envService.getEnvironments();

    const currentEnv: Environment | undefined = this.envs.find((e: Environment) => e.urlPostfix === this._params.initialEnvironmentUrlPostfix);
    if (!currentEnv) {
      throw new Error('There is no environment with the specified URL postfix!');
    }
    this.selectedEnv = this.currentEnv = currentEnv;
  }

  public onSwitchButtonClicked(): void {
    this._dialogRef.close(<EnvironmentSelectorDialogResult> {
      selectedEnvironment: this.selectedEnv
    });
  }
}
