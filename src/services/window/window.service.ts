import { Injectable } from '@angular/core';
import { remote } from 'electron';
import { MessageBoxOptions, OpenFolderDialogOptions } from './window.types';

@Injectable()
export class WindowService {
  public closeCurrentWindow(): void {
    this._getCurrentWindow().close();
  }

  public showMessageBox(options: MessageBoxOptions, callback: (selectedButtonIndex: number) => void): void {
    const opts: Electron.MessageBoxOptions = {
      title: options.title,
      type: options.type,
      buttons: options.buttons,
      message: options.message
    };

    const currentWindow: Electron.BrowserWindow = this._getCurrentWindow();

    remote.dialog.showMessageBox(currentWindow, opts, callback);
  }

  public showOpenFolderDialog(options: OpenFolderDialogOptions, callback: (selectedFolderPath: string | undefined) => void): void {
    const opts: Electron.OpenDialogOptions = {
      defaultPath: options.defaultPath,
      properties: [ 'openDirectory' ]
    };

    const currentWindow: Electron.BrowserWindow = this._getCurrentWindow();

    remote.dialog.showOpenDialog(currentWindow, opts, (selectedFolderPaths: string[]) => {
      const result: string | undefined = selectedFolderPaths && selectedFolderPaths.length > 0
        ? selectedFolderPaths[0]
        : undefined;
      callback(result);
    });
  }

  // tslint:disable-next-line prefer-function-over-method
  private _getCurrentWindow(): Electron.BrowserWindow {
    return remote.BrowserWindow.getFocusedWindow();
  }
}
