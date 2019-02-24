import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './modules/contacts/contacts.component';
import { HomeComponent } from './modules/home/home.component';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
  { component: HomeComponent, path: '' },
  { component: ContactsComponent, path: 'contact' }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(appRoutes)]
})

export class AppRoutingModule {}
