import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppThemeModule } from './app-theme.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    AppThemeModule,
    BrowserModule
  ]
})
export class AppModule { }
