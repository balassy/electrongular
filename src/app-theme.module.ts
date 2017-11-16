import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatInputModule, MatSnackBarModule, MatToolbarModule, MatTooltipModule } from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  declarations: []
})
export class AppThemeModule { }
