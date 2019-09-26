/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

export const getOffseTop = (element: HTMLElement): number => {
  let offsetTop = 0;
  let nextElement: HTMLElement = element;

  while (nextElement.offsetParent) {
    if (!isNaN(nextElement.offsetTop)) {
      offsetTop += nextElement.offsetTop;
    }

    nextElement = nextElement.offsetParent as HTMLElement;
  }

  return offsetTop;
};

