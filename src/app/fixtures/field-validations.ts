/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

export default {
  number: {
    errorMessage: 'This field only accept numbers.',
    regex: '^([0-9])+$'
  },
  required: {
    errorMessage: 'This field is required.',
    regex: '^(?=[a-z]*[A-Z]).*$'
  },
  text: {
    errorMessage: 'This field only accept letters',
    regex: '.+$'
  }
};
