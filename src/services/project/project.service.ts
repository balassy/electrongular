import { Injectable } from '@angular/core';
import { shell } from 'electron';
import { existsSync } from 'fs';  // TODO: async!
import { join } from 'path';
import { PackageJson, ProjectInfo } from './project.types';

// tslint:disable prefer-function-over-method (Instantiated by DI.)

@Injectable()
export class ProjectService {
  public getProjectInfo(path: string): ProjectInfo | undefined {
    if (!path) {
      throw new Error('Please specify the project path!');
    }

    const packageJsonPath: string = join(path, 'package.json');
    if (!existsSync(packageJsonPath)) {
      return undefined;
    }

    const packageJson: PackageJson = require(packageJsonPath);

    return {
      description: packageJson.description,
      name: packageJson.name,
      path,
      version: packageJson.version
    };
  }

  public openProjectFolder(path: string): void {
    if (!path) {
      throw new Error('Please specify the project path to open!');
    }

    shell.showItemInFolder(path);
  }
}
