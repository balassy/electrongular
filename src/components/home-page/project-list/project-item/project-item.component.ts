import { Component, Input, OnInit } from '@angular/core';
import { basename } from 'path';

import { ProjectService } from '../../../../services/project/project.service';
import { ProjectInfo } from '../../../../services/project/project.types';

@Component({
  selector: 'app-project-item',
  templateUrl: './components/home-page/project-list/project-item/project-item.component.html',
  styleUrls: ['./components/home-page/project-list/project-item/project-item.component.css']
})
export class ProjectItemComponent implements OnInit {
  public description: string;

  @Input()
  public path: string;

  public title: string;

  public version: string;

  public constructor(private _projectService: ProjectService) {
  }

  public ngOnInit(): void {
    if (!this.path) {
      throw new Error('Please specify the path for the project item!');
    }

    const projectInfo: ProjectInfo | undefined = this._projectService.getProjectInfo(this.path);

    if (projectInfo) {
      this.title = `${projectInfo.name} @ ${projectInfo.version}`;
      this.description = projectInfo.description;
      this.version = projectInfo.version;
    } else {
      this.title = basename(this.path);
    }
  }

  public onFolderIconClicked(): void {
    this._projectService.openProjectFolder(this.path);
  }
}
