import { Injectable } from '@angular/core';
import { existsSync, readFileSync } from 'fs';  // TODO: async!
import { join } from 'path';

// tslint:disable prefer-function-over-method (Instantiated by DI.)

@Injectable()
export class GitService {
  // TODO: Async https://raw.githubusercontent.com/jonschlinkert/git-branch/master/index.js
  public getCurrentBranchName(folderPath: string): string | null {
    const headFilePath: string = this._gitHeadpath(folderPath);
    if (!existsSync(headFilePath)) {
      throw new Error('.git/HEAD does not exist');
    }

    return this._parseBranches(readFileSync(headFilePath, 'utf8'));
  }

  private _gitHeadpath(folderPath: string): string {
    return join(folderPath, '.git/HEAD');
  }

  private _parseBranches(str: string): string | null {
    const match: RegExpExecArray | null = /ref: refs\/heads\/([^\n]+)/.exec(String(str));
    return match && match[1];
  }
}
