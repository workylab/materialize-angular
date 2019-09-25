/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

import { Component } from '@angular/core';
import { config } from '../../../../config';

@Component({
  selector: `${ config.components.prefix }-step-label`,
  templateUrl: './step-label.component.html'
})
export class StepLabelComponent {
  public prefix = config.components.prefix;
}
