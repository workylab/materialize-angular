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
  selector: `${ config.components.prefix }-step-indicator`,
  templateUrl: './step-indicator.component.html'
})
export class StepIndicatorComponent {
  public prefix = config.components.prefix;
}
