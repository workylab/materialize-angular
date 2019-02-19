import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { ComponentsModule } from './components/components.module';
import { HomeComponent } from './modules/home/home.component';
import { NgModule } from '@angular/core';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
	  AppComponent,
    HomeComponent
  ],
  imports: [
	  BrowserModule,
    AppRoutingModule,
    ComponentsModule
  ]
})

export class AppModule {}
