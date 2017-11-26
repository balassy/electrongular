import { Injectable } from '@angular/core';

import { Environment } from './../../models/environment';

// tslint:disable prefer-function-over-method (Instantiated by DI.)

@Injectable()
export class EnvironmentService {
  public getEnvironment(urlPostfix: string): Environment | undefined {
    if (!urlPostfix) {
      throw new Error('Please specify the URL postfix of the environment!');
    }

    return this.getEnvironments().find((e: Environment) => e.urlPostfix === urlPostfix);
  }

  public getEnvironments(): Environment[] {
    return [
      { urlPostfix: 'dev', friendlyName: 'Local (-dev)' },
      { urlPostfix: 'app51', friendlyName: 'Dev (-app51)' },
      { urlPostfix: 'alphawd1', friendlyName: 'AlphaWD1' }
    ];
  }
}
