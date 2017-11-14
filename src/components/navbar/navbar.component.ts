import { Component, Inject } from '@angular/core';

import { WindowService } from '../../services/window/window.service';
import { MessageBoxOptions } from '../../services/window/window.types';

@Component({
  selector: 'app-navbar',
  templateUrl: './components/navbar/navbar.component.html',
  styleUrls: ['./components/navbar/navbar.component.css']
})
export class NavbarComponent {
  public constructor(@Inject(WindowService) private _windowService: WindowService) {
  }

  public onCloseButtonClicked(): void {
    const opts: MessageBoxOptions = {
      title: 'Exit',
      type: 'warning',
      buttons: ['OK', 'Cancel'],
      message: 'Are you really you want to exit the application?'
    };

    this._windowService.showMessageBox(opts, (selectedButtonIndex: number) => {
      if (selectedButtonIndex === 0) {
        this._windowService.closeCurrentWindow();
      }
    });
  }
}
