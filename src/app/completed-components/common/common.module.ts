import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PrefixDirective } from './prefix.directive';
import { RippleDirective } from './ripple.directive';
import { SuffixDirective } from './suffix.directive';

@NgModule({
  declarations: [
    PrefixDirective,
    RippleDirective,
    SuffixDirective
  ],
  exports: [
    PrefixDirective,
    RippleDirective,
    SuffixDirective
  ],
  imports: [CommonModule]
})
export class MaterializeCommonModule {
}
