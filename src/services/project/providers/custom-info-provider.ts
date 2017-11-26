import { InfoProvider } from './info-provider';

export class CustomInfoProvider extends InfoProvider {
  public constructor(protected _folderPath: string) {
    super(_folderPath);
  }
}
