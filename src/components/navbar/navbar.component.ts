import { Component } from '@angular/core';
import { remote } from 'electron';

@Component({
  selector: 'app-navbar',
  templateUrl: './components/navbar/navbar.component.html',
  styleUrls: ['./components/navbar/navbar.component.css']
})
export class NavbarComponent {
  public onCloseButtonClicked(): void {
    const currentWindow: Electron.BrowserWindow = remote.BrowserWindow.getFocusedWindow();    
    
    const options: Electron.MessageBoxOptions = {
      title: 'Exit',
      type: 'warning',
      buttons: [ 'OK', 'Cancel' ],
      message: 'Are you sure you want to exit the application?'
    };

    remote.dialog.showMessageBox(currentWindow, options, (response: number) => {
      if (response === 0) {
        currentWindow.close();
      }
    });
  }
}
