/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { FormMessageComponent } from './form-message.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [FormMessageComponent],
  exports: [FormMessageComponent],
  imports: [CommonModule]
})
export class MaterializeFormMessageModule {
}
