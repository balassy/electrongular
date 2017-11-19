import { Injectable } from '@angular/core';
import { existsSync, readFileSync } from 'fs';  // TODO: async!
import { join } from 'path';
import simpleGit = require('simple-git/promise');

import { CommitInfo } from './git.types';
import { ListLogLine, ListLogSummary } from './simple-git.types';

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

  public async getLastCommit(folderPath: string): Promise<CommitInfo | undefined> {
    try {
      const commits: ListLogSummary = await simpleGit(folderPath).log(['-1']);
      const lastCommit: ListLogLine = commits.latest;

      const lastCommitRelativeDate: string = (await simpleGit(folderPath).log(['-1', '--format=%cr'])).latest.hash;

      return {
        commiterEmail: lastCommit.author_email,
        commiterName: lastCommit.author_name,
        date: lastCommit.date,
        message: lastCommit.message,
        relativeDate: lastCommitRelativeDate
      };
    } catch (error) {
      // Can happen if there are no commits on the current branch yet.
      return undefined;
    }
  }

  private _gitHeadpath(folderPath: string): string {
    return join(folderPath, '.git/HEAD');
  }

  private _parseBranches(str: string): string | null {
    const match: RegExpExecArray | null = /ref: refs\/heads\/([^\n]+)/.exec(String(str));
    return match && match[1];
  }
}
