import { CommonModule } from '@angular/common';
import { MaterializeCommonModule } from '../common/common.module';
import { NgModule } from '@angular/core';
import { ScrollSpyComponent } from './scroll-spy.component';
import { ScrollSpyItemComponent } from './scroll-spy-item/scroll-spy-item.component';

@NgModule({
  declarations: [
    ScrollSpyComponent,
    ScrollSpyItemComponent
  ],
  exports: [
    ScrollSpyComponent,
    ScrollSpyItemComponent
  ],
  imports: [
    CommonModule,
    MaterializeCommonModule
  ]
})
export class MaterializeScrollSpyModule {
}
