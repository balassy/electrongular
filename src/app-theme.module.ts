import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatSnackBarModule, MatToolbarModule, MatTooltipModule } from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  declarations: []
})
export class AppThemeModule { }
