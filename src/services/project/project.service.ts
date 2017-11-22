import { Injectable } from '@angular/core';
import { shell } from 'electron';
import { basename } from 'path';
import { GenericInfoProvider } from './providers/generic-info-provider';
import { MaverickInfoProvider } from './providers/maverick-info-provider';
import { ThundercatInfoProvider } from './providers/thundercat-info-provider';

// tslint:disable prefer-function-over-method (Instantiated by DI.)

@Injectable()
export class ProjectService {
  public getInfoProvider(path: string): GenericInfoProvider {
    switch (basename(path)) {
      case 'maverick':
        return new MaverickInfoProvider(path);
      case 'thundercat':
        return new ThundercatInfoProvider(path);
      default:
        return new GenericInfoProvider(path);
    }
  }

  public openProjectFolder(path: string): void {
    if (!path) {
      throw new Error('Please specify the project path to open!');
    }

    shell.showItemInFolder(path);
  }
}
