import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { basename } from 'path';

import { SwitchBranchDialog } from './switch-branch-dialog/switch-branch-dialog.component';
import { DialogParams, DialogResult } from './switch-branch-dialog/switch-branch-dialog.types';

import { EnvironmentSelectorDialogComponent } from './../../../shared/environment-selector-dialog/environment-selector-dialog.component';
import { EnvironmentSelectorDialogParams, EnvironmentSelectorDialogResult } from './../../../shared/environment-selector-dialog/environment-selector-dialog.types';

import { GitService } from '../../../../services/git/git.service';
import { CommitInfo } from '../../../../services/git/git.types';
import { ProjectService } from '../../../../services/project/project.service';
import { ProjectInfo } from '../../../../services/project/project.types';
import { GenericInfoProvider } from '../../../../services/project/providers/generic-info-provider';

@Component({
  selector: 'app-project-item',
  templateUrl: './components/home-page/project-list/project-item/project-item.component.html',
  styleUrls: ['./components/home-page/project-list/project-item/project-item.component.css']
})
export class ProjectItemComponent implements OnInit {
  @Input()
  public path: string;

  public projectInfo: {
    color?: string;
    currentBranch?: string;
    currentEnvName?: string;
    description?: string;
    environment?: string;
    icon?: string;
    lastCommit?: CommitInfo;
    title?: string;
    version?: string;
  };

  public constructor(private _dialog: MatDialog,
                     private _projectService: ProjectService,
                     private _gitService: GitService) {
  }

  public async ngOnInit(): Promise<void> {
    await this._loadProject();
  }

  public onFolderIconClicked(): void {
    this._projectService.openProjectFolder(this.path);
  }

  public async onGetLatestButtonClicked(): Promise<void> {
    await this._gitService.pull(this.path);
    await this._loadProject();
  }

  public async onRefreshButtonClicked(): Promise<void> {
    await this._loadProject();
  }

  public async onSwitchBranchButtonClicked(): Promise<void> {
    await this._gitService.fetch(this.path);
    const remoteBranchNames: string[] = await this._gitService.getRemoteBranches(this.path);

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

        await this._gitService.checkoutBranch(this.path, result.selectedBranchName);

        if (result.getLatest) {
          await this._gitService.pull(this.path);
        }

        await this._loadProject();
      }
    });
  }

  public async onSwitchEnvironmentButtonClicked(): Promise<void> {
    const dialogRef: MatDialogRef<EnvironmentSelectorDialogComponent> = this._dialog.open(EnvironmentSelectorDialogComponent, {
      width: '500px',
      data: <EnvironmentSelectorDialogParams> {
        initialEnvironmentUrlPostfix: this.projectInfo.currentEnvName,
      }
    });

    dialogRef.afterClosed().subscribe(async (result: EnvironmentSelectorDialogResult) => {
      if (result) {
        if (!result.selectedEnvironment) {
          throw new Error('Please select an environment to switch to!');
        }

        if (result.selectedEnvironment.urlPostfix !== this.projectInfo.currentEnvName) {
          console.log('Switching to', result.selectedEnvironment);

          await this._loadProject();
        }
      }
    });
  }

  private async _getLastCommit(): Promise<void> {
    const lastCommit: CommitInfo | undefined = await this._gitService.getLastCommit(this.path);
    if (!!lastCommit) {
      this.projectInfo.lastCommit = lastCommit;
    }
  }

  private async _loadProject(): Promise<void> {
    if (!this.path) {
      throw new Error('Please specify the path for the project item!');
    }

    const infoProvider: GenericInfoProvider = this._projectService.getInfoProvider(this.path);

    const projectInfo: ProjectInfo | undefined = infoProvider.getBasicProperties();

    if (projectInfo) {
      this.projectInfo = {
        color: projectInfo.color,
        currentEnvName: projectInfo.environmentName,
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
        title: basename(this.path),
        description: '(There is no package.json file in this folder.)'
      };
    }

    this.projectInfo.currentBranch = this._gitService.getCurrentBranchName(this.path);

    await this._getLastCommit();
  }
}
