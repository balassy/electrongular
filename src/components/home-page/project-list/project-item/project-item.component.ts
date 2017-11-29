import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { SwitchBranchDialog } from './switch-branch-dialog/switch-branch-dialog.component';
import { DialogParams, DialogResult } from './switch-branch-dialog/switch-branch-dialog.types';

import { EnvironmentSelectorDialogComponent } from './../../../shared/environment-selector-dialog/environment-selector-dialog.component';
import { EnvironmentSelectorDialogParams, EnvironmentSelectorDialogResult } from './../../../shared/environment-selector-dialog/environment-selector-dialog.types';

import { Environment } from '../../../../models/environment';
import { ProjectPath } from '../../../../models/folder';
import { GitService } from '../../../../services/git/git.service';
import { CommitInfo } from '../../../../services/git/git.types';
import { ProgressService } from '../../../../services/progress/progress.service';
import { ProjectService } from '../../../../services/project/project.service';
import { ProjectInfo } from '../../../../services/project/project.types';
import { InfoProvider } from '../../../../services/project/providers/info-provider';

@Component({
  selector: 'app-project-item',
  templateUrl: './components/home-page/project-list/project-item/project-item.component.html',
  styleUrls: ['./components/home-page/project-list/project-item/project-item.component.css']
})
export class ProjectItemComponent implements OnInit {
  public projectInfo: {
    color?: string;
    currentBranch?: string;
    description?: string;
    environment?: Environment;
    icon?: string;
    lastCommit?: CommitInfo;
    title?: string;
    version?: string;
  };

  @Input()
  public projectPath: ProjectPath;

  public constructor(private _dialog: MatDialog,
                     private _projectService: ProjectService,
                     private _gitService: GitService,
                     private _progressService: ProgressService) {
  }

  public async ngOnInit(): Promise<void> {
    await this._loadProject();
  }

  public onFolderIconClicked(): void {
    this._projectService.openProjectFolder(this.projectPath.fullPath);
  }

  public async onGetLatestButtonClicked(): Promise<void> {
    await this._gitService.pull(this.projectPath.fullPath);
    await this._loadProject();
  }

  public async onRefreshButtonClicked(): Promise<void> {
    await this._loadProject();
  }

  public async onSwitchBranchButtonClicked(): Promise<void> {
    await this._gitService.fetch(this.projectPath.fullPath);
    const remoteBranchNames: string[] = await this._gitService.getRemoteBranches(this.projectPath.fullPath);

    const dialogRef: MatDialogRef<SwitchBranchDialog> = this._dialog.open(SwitchBranchDialog, {
      data: <DialogParams> {
        currentBranchName: this.projectInfo.currentBranch,
        remoteBranchNames
      }
    });

    dialogRef.afterClosed().subscribe(async (result: DialogResult) => {
      if (result) {
        if (!result.selectedBranchName) {
          throw new Error('Please select a branch!');
        }

        await this._gitService.checkoutBranch(this.projectPath.fullPath, result.selectedBranchName);

        if (result.getLatest) {
          await this._gitService.pull(this.projectPath.fullPath);
        }

        await this._loadProject();
      }
    });
  }

  public async onSwitchEnvironmentButtonClicked(): Promise<void> {
    const initialEnvUrlPostfix: string | undefined = this.projectInfo.environment ? this.projectInfo.environment.urlPostfix : undefined;

    const dialogRef: MatDialogRef<EnvironmentSelectorDialogComponent> = this._dialog.open(EnvironmentSelectorDialogComponent, {
      width: '500px',
      data: <EnvironmentSelectorDialogParams> {
        initialEnvironmentUrlPostfix: initialEnvUrlPostfix
      }
    });

    dialogRef.afterClosed().subscribe(async (result: EnvironmentSelectorDialogResult) => {
      if (result) {
        if (!result.selectedEnvironment) {
          throw new Error('Please select an environment to switch to!');
        }

        if (result.selectedEnvironment.urlPostfix !== initialEnvUrlPostfix) {
          console.log('Switching to', result.selectedEnvironment);

          await this._loadProject();
        }
      }
    });
  }

  private async _getLastCommit(): Promise<void> {
    const lastCommit: CommitInfo | undefined = await this._gitService.getLastCommit(this.projectPath.fullPath);
    if (!!lastCommit) {
      this.projectInfo.lastCommit = lastCommit;
    }
  }

  private async _loadProject(): Promise<void> {
    if (!this.projectPath.fullPath) {
      throw new Error('Please specify the path for the project item!');
    }

    this._progressService.start('Loading the project...');

    const infoProvider: InfoProvider = this._projectService.getInfoProvider(this.projectPath.fullPath);

    const projectInfo: ProjectInfo | undefined = infoProvider.getBasicProperties();

    if (projectInfo) {
      this.projectInfo = {
        color: projectInfo.color,
        description: projectInfo.description,
        environment: projectInfo.environment,
        icon: projectInfo.icon,
        title: projectInfo.version
          ? `${projectInfo.name} @ ${projectInfo.version}`
          : projectInfo.name,
        version: projectInfo.version
      };
    } else {
      this.projectInfo = {
        title: this.projectPath.subfolderName,
        description: '(There is no package.json file in this folder.)'
      };
    }

    this.projectInfo.currentBranch = this._gitService.getCurrentBranchName(this.projectPath.fullPath);

    await this._getLastCommit();

    this._progressService.end();
  }
}
