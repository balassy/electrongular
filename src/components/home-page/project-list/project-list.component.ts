import { Component, OnInit } from '@angular/core';
import { ProjectPath } from '../../../models/folder';
import { FolderService } from '../../../services/folder/folder.service';
import { ProjectService } from '../../../services/project/project.service';
import { SettingsService } from '../../../services/settings/settings.service';
import { AppSettings } from '../../../services/settings/settings.types';

@Component({
  selector: 'app-project-list',
  templateUrl: './components/home-page/project-list/project-list.component.html',
  styleUrls: ['./components/home-page/project-list/project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  public projectPaths: ProjectPath[];

  public constructor(private _folderService: FolderService,
                     private _projectService: ProjectService,
                     private _settingsService: SettingsService) {
  }

  public ngOnInit(): void {
    const appSettings: AppSettings = this._settingsService.load();
    const projectPaths: ProjectPath[] = this._folderService.getSubfolders(appSettings.projectsFolderPath);
    this.projectPaths = projectPaths
      .filter((projectPath: ProjectPath) => !appSettings.showOnlyCustomProjects || this._projectService.isCustom(projectPath.subfolderName));
  }
}
