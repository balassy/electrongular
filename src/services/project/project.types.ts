import { Environment } from '../../models/environment';

export interface PackageJson {
  description: string;
  name: string;
  path: string;
  version: string;
}

export interface ProjectInfo {
  color?: string;
  description: string;
  environment?: Environment;
  icon?: string;
  name?: string;
  version?: string;
}
