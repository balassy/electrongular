import { existsSync } from 'fs';  // TODO: async!
import { join } from 'path';
import { ProjectInfo } from './../project.types';
import { GenericInfoProvider } from './generic-info-provider';

interface Config {
  default: {
    restApiHost: string;
  };
}

export class MaverickInfoProvider extends GenericInfoProvider {
  public constructor(_folderPath: string) {
    super(_folderPath);
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

  private _getCurrentEnvironment(): string | undefined {
    const configPath: string = join(this._folderPath, 'client/app/config/config.ts');
    if (!existsSync(configPath)) {
      return undefined;
    }

    const config: Config = require(configPath);

    const regex: RegExp = /https:\/\/rest-(.*)\.bold360\.io/g;
    const matches: RegExpExecArray | null = regex.exec(config.default.restApiHost);
    return matches ? matches[1] : undefined;
  }
}
