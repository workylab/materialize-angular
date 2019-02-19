import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
  { component: HomeComponent, path: '' }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(appRoutes)]
})

export class AppRoutingModule {}
