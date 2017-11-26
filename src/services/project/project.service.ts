import { Injectable } from '@angular/core';
import { shell } from 'electron';
import { basename } from 'path';
import { EnvironmentService } from '../environment/environment.service';
import { GenericInfoProvider } from './providers/generic-info-provider';
import { MaverickInfoProvider } from './providers/maverick-info-provider';
import { ThundercatInfoProvider } from './providers/thundercat-info-provider';

// tslint:disable prefer-function-over-method (Instantiated by DI.)

@Injectable()
export class ProjectService {
  public constructor(private _envService: EnvironmentService) {
  }

  public getInfoProvider(path: string): GenericInfoProvider {
    switch (basename(path)) {
      case 'maverick':
        return new MaverickInfoProvider(path, this._envService);
      case 'thundercat':
        return new ThundercatInfoProvider(path, this._envService);
      default:
        return new GenericInfoProvider(path, this._envService);
    }
  }

  public openProjectFolder(path: string): void {
    if (!path) {
      throw new Error('Please specify the project path to open!');
    }

    shell.showItemInFolder(path);
  }
}
