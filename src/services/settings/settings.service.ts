import { Injectable } from '@angular/core';
import * as Settings from 'electron-settings';

import { AppSettings } from './settings.types';

// tslint:disable prefer-function-over-method (Instantiated by DI.)

@Injectable()
export class SettingsService {
  public getSettingsPath(): string {
    return Settings.file();
  }

  public load(): AppSettings {
    return Settings.getAll() as AppSettings;
  }

  public save(settings: AppSettings): void {
    Settings.setAll(settings);
  }
}
