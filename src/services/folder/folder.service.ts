import { Injectable } from '@angular/core';
import { existsSync, lstatSync, readdirSync } from 'fs';  // TODO: async!
import { join } from 'path';

// tslint:disable prefer-function-over-method (Instantiated by DI.)

@Injectable()
export class FolderService {
  public getSubfolders(parentFolderPath: string): string[] {
    if (!parentFolderPath) {
      throw new Error('Please specify the parentFolderPath!');
    }

    if (!this._folderExists(parentFolderPath)) {
      throw new Error('The specified folder does not exist!');
    }

    return readdirSync(parentFolderPath)
      .map((itemName: string) => join(parentFolderPath, itemName))
      .filter((path: string) => this._isGitFolder(path));
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
