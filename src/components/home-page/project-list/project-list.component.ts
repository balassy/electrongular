import { Component, OnInit } from '@angular/core';
import { FolderService } from '../../../services/folder/folder.service';
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
                     private _settingsService: SettingsService) {
  }

  public ngOnInit(): void {
    const appSettings: AppSettings = this._settingsService.load();
    this.paths = this._folderService.getSubfolders(appSettings.projectsFolderPath);
  }
}
