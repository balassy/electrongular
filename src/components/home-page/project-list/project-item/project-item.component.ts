import { Component, Input, OnInit } from '@angular/core';
import { basename } from 'path';

import { GitService } from '../../../../services/git/git.service';
import { CommitInfo } from '../../../../services/git/git.types';
import { ProjectService } from '../../../../services/project/project.service';
import { ProjectInfo } from '../../../../services/project/project.types';

@Component({
  selector: 'app-project-item',
  templateUrl: './components/home-page/project-list/project-item/project-item.component.html',
  styleUrls: ['./components/home-page/project-list/project-item/project-item.component.css']
})
export class ProjectItemComponent implements OnInit {
  public currentBranch: string;

  public description: string;

  public lastCommit: CommitInfo;

  @Input()
  public path: string;

  public title: string;

  public version: string;

  public constructor(private _projectService: ProjectService,
                     private _gitService: GitService) {
  }

  public async ngOnInit(): Promise<void> {
    await this._loadProject();
  }

  public onFolderIconClicked(): void {
    this._projectService.openProjectFolder(this.path);
  }

  public async onRefreshButtonClicked(): Promise<void> {
    await this._loadProject();
  }

  private async _getLastCommit(): Promise<void> {
    const lastCommit: CommitInfo | undefined = await this._gitService.getLastCommit(this.path);
    if (!!lastCommit) {
      this.lastCommit = lastCommit;
    }
  }

  private async _loadProject(): Promise<void> {
    if (!this.path) {
      throw new Error('Please specify the path for the project item!');
    }

    const projectInfo: ProjectInfo | undefined = this._projectService.getProjectInfo(this.path);

    if (projectInfo) {
      this.title = `${projectInfo.name} @ ${projectInfo.version}`;
      this.description = projectInfo.description || '(The package has no description.)';
      this.version = projectInfo.version;
    } else {
      this.title = basename(this.path);
      this.description = '(There is no package.json file in this folder.)';
    }

    const currentBranch: string | null = this._gitService.getCurrentBranchName(this.path);
    this.currentBranch = currentBranch || '(unknown)';

    await this._getLastCommit();
  }
}
