import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './components/home-page/home-page.component';
import { SettingsPageComponent } from './components/settings-page/settings-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'settings', component: SettingsPageComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
