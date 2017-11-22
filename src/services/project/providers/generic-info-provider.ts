import { existsSync } from 'fs';  // TODO: async!
import { basename, join } from 'path';
import { PackageJson, ProjectInfo } from './../project.types';
import { PropertyInfo } from './provider.types';

export class GenericInfoProvider {
  public constructor(protected _folderPath: string) {
    if (!_folderPath) {
      throw new Error('Please specify the folderPath for the GenericInfoProvider!');
    }
  }

  public getAdditionalProperties(): PropertyInfo[] {
    return [];
  }

  public getBasicProperties(): ProjectInfo | undefined {
    return this._getBasicProperties();
  }

  protected _getBasicProperties(): ProjectInfo {
    const packageJson: PackageJson | undefined = this._getPackageJson();

    return !packageJson
      ? {
        description: '(There is no package.json file in this folder.)',
        name: basename(this._folderPath)
      }
      : {
        description: packageJson.description,
        name: packageJson.name,
        version: packageJson.version
      };
  }

  protected _getPackageJson(): PackageJson | undefined {
    const packageJsonPath: string = join(this._folderPath, 'package.json');
    if (!existsSync(packageJsonPath)) {
      return undefined;
    }

    const packageJson: PackageJson = require(packageJsonPath);
    return packageJson;
  }
}
