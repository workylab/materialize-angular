/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

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
