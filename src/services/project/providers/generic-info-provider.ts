import { InfoProvider } from './info-provider';

export class GenericInfoProvider extends InfoProvider {
  public constructor(protected _folderPath: string) {
    super(_folderPath);
  }
}
