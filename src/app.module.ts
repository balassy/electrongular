import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppThemeModule } from './app-theme.module';
import { AppComponent } from './components/app.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { WindowService } from './services/window/window.service';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    AppThemeModule,
    BrowserModule
  ],
  providers: [
    WindowService
  ]
})
export class AppModule { }
