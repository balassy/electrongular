import { existsSync } from 'fs';  // TODO: async!
import { join } from 'path';
import { Environment } from '../../../models/environment';
import { EnvironmentService } from '../../environment/environment.service';
import { ProjectInfo } from './../project.types';
import { GenericInfoProvider } from './generic-info-provider';

interface Config {
  default: {
    restApiHost: string;
  };
}

export class MaverickInfoProvider extends GenericInfoProvider {
  public constructor(protected _folderPath: string,
                     protected _envService: EnvironmentService) {
    super(_folderPath, _envService);
  }

  public getBasicProperties(): ProjectInfo {
    const props: ProjectInfo | undefined = this._getBasicProperties();

    props.color = 'accent';
    props.environment = this._getCurrentEnvironment();
    props.icon = 'dashboard';
    props.name = 'Maverick (Web Workspace)';
    props.version = '';
    return props;
  }

  private _getCurrentEnvironment(): Environment | undefined {
    const configPath: string = join(this._folderPath, 'client/app/config/config.ts');
    if (!existsSync(configPath)) {
      return undefined;
    }

    const config: Config = require(configPath);

    const regex: RegExp = /https:\/\/rest-(.*)\.bold360\.io/g;
    const matches: RegExpExecArray | null = regex.exec(config.default.restApiHost);
    const urlPostfix: string | undefined = matches ? matches[1] : undefined;

    return urlPostfix
      ? this._envService.getEnvironment(urlPostfix)
      : undefined;
  }
}
