/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

import { getBooleanValue } from './get-boolean-value.util';

describe('getBooleanValue', () => {
  it('should return default value when value is not boolean', () => {
    const defaultValue = false;

    expect(getBooleanValue(null, defaultValue)).toEqual(defaultValue);
    expect(getBooleanValue(undefined, defaultValue)).toEqual(defaultValue);
  });

  it('should return the value when value is boolean', () => {
    expect(getBooleanValue(true, null)).toEqual(true);
    expect(getBooleanValue(false, null)).toEqual(false);
  });
});
