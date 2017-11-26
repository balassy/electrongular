import npmConf = require('npm-conf');  // tslint:disable-line no-require-imports (This module does not support "import".)
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

  private static _getCurrentEnvironment(): string | undefined {
    const backendHost: string | undefined = ThundercatInfoProvider._getBackendHost();

    if (!backendHost) {
      return undefined;
    }

    const regex: RegExp = /(.*)-backend-(.*)\.bold360\.io/g;
    const matches: RegExpExecArray | null = regex.exec(backendHost);
    return matches ? matches[2] : undefined;  // tslint:disable-line no-magic-numbers (Closely tied to the regexp.)
  }

  public constructor(_folderPath: string) {
    super(_folderPath);
  }

  public getBasicProperties(): ProjectInfo {
    const props: ProjectInfo | undefined = this._getBasicProperties();

    props.color = 'accent';
    props.environmentName = ThundercatInfoProvider._getCurrentEnvironment();
    props.environment = `${ThundercatInfoProvider._getCurrentEnvironment()} (backend: ${ThundercatInfoProvider._getBackendHost()})`;
    props.icon = 'settings';
    props.name = 'Thundercat (Web Admin)';
    props.version = '';
    return props;
  }
}
