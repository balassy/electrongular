import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { WindowService } from '../../../services/window/window.service';
import { MessageBoxOptions } from '../../../services/window/window.types';

@Component({
  selector: 'app-navbar',
  templateUrl: './components/shared/navbar/navbar.component.html',
  styleUrls: ['./components/shared/navbar/navbar.component.css']
})
export class NavbarComponent {
  public constructor(@Inject(WindowService) private _windowService: WindowService,
                     @Inject(Router) private _router: Router) {
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

  public onSettingsButtonClicked(): Promise<boolean> {
    return this._router.navigate(['/settings']);
  }
}
