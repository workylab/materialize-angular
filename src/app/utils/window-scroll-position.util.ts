/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

export const windowScrollPosition = (): number => {
  if (window.pageYOffset) {
    return window.pageYOffset;
  }

  return document.body.scrollTop;
};
