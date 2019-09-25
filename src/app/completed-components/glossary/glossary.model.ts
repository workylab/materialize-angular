/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

import { ScrollSpyComponent } from '../scroll-spy/scroll-spy.component';

export interface GlossaryModel {
  className: string;
  scrollSpy: ScrollSpyComponent | null;
  topSpace: number;
}
