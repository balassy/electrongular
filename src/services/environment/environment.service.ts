import { Injectable } from '@angular/core';

import { Environment } from './../../models/environment';

// tslint:disable prefer-function-over-method (Instantiated by DI.)

@Injectable()
export class EnvironmentService {
  public getEnvironments(): Environment[] {
    return [
      { urlPostfix: 'dev', friendlyName: 'Local (-dev)' },
      { urlPostfix: 'app51', friendlyName: 'Dev (-app51)' },
      { urlPostfix: 'alphawd1', friendlyName: 'AlphaWD1' }
    ];
  }
}
