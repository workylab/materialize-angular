import { AccordionComponent } from './accordion.component';
import { CommonModule } from '@angular/common';
import { MaterializeCollapsibleModule } from '../collapsible/collapsible.module';
import { MaterializeCommonModule } from '../common/common.module';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [AccordionComponent],
  exports: [AccordionComponent],
  imports: [
    MaterializeCollapsibleModule,
    CommonModule,
    MaterializeCommonModule
  ]
})
export class MaterializeAccordionModule {
}
