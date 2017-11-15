import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './components/settings-page/settings-page.component.html',
  styleUrls: ['./components/settings-page/settings-page.component.css']
})
export class SettingsPageComponent {
  public constructor(private _router: Router,
                     private _snackBar: MatSnackBar) {
  }

  public onSaveButtonClicked(): Promise<boolean> {
    this._snackBar.open('Settings saved successfully.', 'Dismiss', { duration: 5000 });
    return this._navigateToHome();
  }

  private _navigateToHome(): Promise<boolean> {
    return this._router.navigate(['/']);
  }
}
