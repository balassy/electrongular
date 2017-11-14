import { Injectable } from '@angular/core';
import { remote } from 'electron';
import { MessageBoxOptions } from './window.types';

@Injectable()
export class WindowService {
  public closeCurrentWindow(): void {
    const currentWindow: Electron.BrowserWindow = remote.BrowserWindow.getFocusedWindow();    
    currentWindow.close();
  }

  public showMessageBox(options: MessageBoxOptions, callback: (selectedButtonIndex: number) => void): void {
    const opts: Electron.MessageBoxOptions = {
      title: options.title,
      type: options.type,
      buttons: options.buttons,
      message: options.message
    };

    const currentWindow: Electron.BrowserWindow = remote.BrowserWindow.getFocusedWindow();    

    remote.dialog.showMessageBox(currentWindow, opts, callback);
  }
}