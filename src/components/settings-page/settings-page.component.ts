import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { SettingsService } from '../../services/settings/settings.service';
import { AppSettings } from '../../services/settings/settings.types';
import { WindowService } from '../../services/window/window.service';
import { OpenFolderDialogOptions } from '../../services/window/window.types';

@Component({
  selector: 'app-home',
  templateUrl: './components/settings-page/settings-page.component.html',
  styleUrls: ['./components/settings-page/settings-page.component.css']
})
export class SettingsPageComponent implements OnInit {
  public appSettings: AppSettings;
  public settingsPath: string;

  public constructor(private _router: Router,
                     private _cd: ChangeDetectorRef,
                     private _snackBar: MatSnackBar,
                     private _settingsService: SettingsService,
                     private _windowService: WindowService) {
  }

  public ngOnInit(): void {
    this.settingsPath = this._settingsService.getSettingsPath();
    this.appSettings = this._settingsService.load();
  }

  public onSaveButtonClicked(): Promise<boolean> {
    this._settingsService.save(this.appSettings);

    this._snackBar.open('Settings saved successfully.', 'Dismiss', { duration: 5000 });
    return this._navigateToHome();
  }

  public onSelectFolderButtonClicked(): void {
    const options: OpenFolderDialogOptions = {
      defaultPath: this.appSettings.projectsFolderPath
    };

    this._windowService.showOpenFolderDialog(options, (selectedFolderPath: string | undefined) => {
      if (selectedFolderPath) {
        this.appSettings.projectsFolderPath = selectedFolderPath;

        // Force the view to update.
        this._cd.detectChanges();
      }
    });
  }

  private _navigateToHome(): Promise<boolean> {
    return this._router.navigate(['/']);
  }
}
