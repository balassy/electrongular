import { Injectable } from '@angular/core';
import { remote } from 'electron';
import { MessageBoxOptions } from './window.types';

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

  // tslint:disable-next-line prefer-function-over-method
  private _getCurrentWindow(): Electron.BrowserWindow {
    return remote.BrowserWindow.getFocusedWindow();
  }
}
