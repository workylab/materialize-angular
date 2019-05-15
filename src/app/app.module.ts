import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { ContactsComponent } from './modules/contacts/contacts.component';
import { HomeComponent } from './modules/home/home.component';
import { MaterializeComponentsModule } from './components/components.module';
import { NgModule } from '@angular/core';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    ContactsComponent,
    HomeComponent
  ],
  imports: [
    AppRoutingModule,
	  BrowserModule,
    MaterializeComponentsModule
  ]
})

export class AppModule {}
