import npmConf = require('npm-conf');  // tslint:disable-line no-require-imports (This module does not support "import".)
import { Environment } from '../../../models/environment';
import { EnvironmentService } from '../../environment/environment.service';
import { ProjectInfo } from './../project.types';
import { GenericInfoProvider } from './generic-info-provider';
/*
interface NpmConf {
  get(key: string): string | undefined;
} */

export class ThundercatInfoProvider extends GenericInfoProvider {
  private static _getBackendHost(): string | undefined {
    return npmConf().get('backendHost');
  }

  public constructor(protected _folderPath: string,
                     protected _envService: EnvironmentService) {
    super(_folderPath, _envService);
  }

  public getBasicProperties(): ProjectInfo {
    const props: ProjectInfo | undefined = this._getBasicProperties();

    props.color = 'accent';
    props.environment = this._getCurrentEnvironment();
    props.icon = 'settings';
    props.name = 'Thundercat (Web Admin)';
    props.version = '';
    return props;
  }

  private _getCurrentEnvironment(): Environment | undefined {
    const backendHost: string | undefined = ThundercatInfoProvider._getBackendHost();

    if (!backendHost) {
      return undefined;
    }

    const regex: RegExp = /(.*)-backend-(.*)\.bold360\.io/g;
    const matches: RegExpExecArray | null = regex.exec(backendHost);
    const urlPostfix: string | undefined = matches ? matches[2] : undefined;  // tslint:disable-line no-magic-numbers (Closely tied to the regexp.)

    return urlPostfix
      ? this._envService.getEnvironment(urlPostfix)
      : undefined;
  }
}
