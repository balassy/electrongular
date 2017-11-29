import { Injectable } from '@angular/core';
import { existsSync, lstatSync, readdirSync } from 'fs';  // TODO: async!
import { join } from 'path';
import { ProjectPath } from './../../models/folder';

// tslint:disable prefer-function-over-method (Instantiated by DI.)

@Injectable()
export class FolderService {
  public getSubfolders(parentFolderPath: string): ProjectPath[] {
    if (!parentFolderPath) {
      throw new Error('Please specify the parentFolderPath!');
    }

    if (!this._folderExists(parentFolderPath)) {
      throw new Error('The specified folder does not exist!');
    }

    return readdirSync(parentFolderPath)
      .map((subfolderName: string) =>
        <ProjectPath> {
          fullPath: join(parentFolderPath, subfolderName),
          subfolderName
        })
      .filter((projectPath: ProjectPath) => this._isGitFolder(projectPath.fullPath));
  }

  private _folderExists(path: string): boolean {
    if (!path) {
      throw new Error('Please specify the path!');
    }

    return existsSync(path);
  }

  private _isGitFolder(path: string): boolean {
    return lstatSync(path).isDirectory() && this._folderExists(join(path, '.git'));
  }
}
