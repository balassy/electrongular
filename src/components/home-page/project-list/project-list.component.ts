import { Component, OnInit } from '@angular/core';
import { FolderService } from '../../../services/folder/folder.service';
import { ProjectPath } from '../../../services/folder/folder.types';
import { ProjectService } from '../../../services/project/project.service';
import { SettingsService } from '../../../services/settings/settings.service';
import { AppSettings } from '../../../services/settings/settings.types';

@Component({
  selector: 'app-project-list',
  templateUrl: './components/home-page/project-list/project-list.component.html',
  styleUrls: ['./components/home-page/project-list/project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  public paths: string[];

  public constructor(private _folderService: FolderService,
                     private _projectService: ProjectService,
                     private _settingsService: SettingsService) {
  }

  public ngOnInit(): void {
    const appSettings: AppSettings = this._settingsService.load();
    const projectPaths: ProjectPath[] = this._folderService.getSubfolders(appSettings.projectsFolderPath);
    this.paths = projectPaths
      .filter((projectPath: ProjectPath) => this._projectService.isCustom(projectPath.subfolderName))
      .map((projectPath: ProjectPath) => projectPath.fullPath);
  }
}
