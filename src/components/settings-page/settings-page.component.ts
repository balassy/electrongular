import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './components/settings-page/settings-page.component.html',
  styleUrls: ['./components/settings-page/settings-page.component.css']
})
export class SettingsPageComponent {
  public constructor(@Inject(Router) private _router: Router) {
  }

  public onCancelButtonClicked(): Promise<boolean> {
    return this._navigateToHome();
  }

  public onSaveButtonClicked(): Promise<boolean> {
    return this._navigateToHome();
  }

  private _navigateToHome(): Promise<boolean> {
    return this._router.navigate(['/']);
  }
}
