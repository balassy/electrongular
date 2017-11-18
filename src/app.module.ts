import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'; // tslint:disable-line ordered-imports (Must come after BrowserModule.)

import { AppRoutingModule } from './app-routing.module';
import { AppThemeModule } from './app-theme.module';

import { AppComponent } from './components/app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ProjectItemComponent } from './components/home-page/project-list/project-item/project-item.component';
import { ProjectListComponent } from './components/home-page/project-list/project-list.component';
import { SettingsPageComponent } from './components/settings-page/settings-page.component';

import { NavbarComponent } from './components/shared/navbar/navbar.component';

import { FolderService } from './services/folder/folder.service';
import { SettingsService } from './services/settings/settings.service';
import { WindowService } from './services/window/window.service';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HomePageComponent,
    NavbarComponent,
    ProjectItemComponent,
    ProjectListComponent,
    SettingsPageComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppThemeModule,
    FormsModule
  ],
  providers: [
    FolderService,
    SettingsService,
    WindowService
  ]
})
export class AppModule { }
