import { Environment } from './../../../models/environment';

export interface EnvironmentSelectorDialogParams {
  initialEnvironmentUrlPostfix: string;
}

export interface EnvironmentSelectorDialogResult {
  selectedEnvironment: Environment;
}
