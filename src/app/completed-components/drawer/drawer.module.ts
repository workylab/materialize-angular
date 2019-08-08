import { CommonModule } from '@angular/common';
import { DrawerComponent } from './Drawer.component';
import { DrawerContainerComponent } from './drawer-container/drawer-container.component';
import { DrawerContentComponent } from './drawer-content/drawer-content.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    DrawerComponent,
    DrawerContainerComponent,
    DrawerContentComponent
  ],
  exports: [
    DrawerComponent,
    DrawerContainerComponent,
    DrawerContentComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MaterializeDrawerModule {
}
