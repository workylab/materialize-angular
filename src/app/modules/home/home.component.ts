/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

import { SortedColumnModel, TableModel } from '../../components/table/table.model';
import { Component } from '@angular/core';
import { DropdownItemModel } from '../../components/dropdown/dropdown.model';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent {
  public tableData: TableModel = {
    body: [
      [
        {
          content: 'Value 1',
          type: 'text'
        }, {
          content: 'Value 2',
          type: 'text'
        }, {
          content: 'Value 3',
          type: 'text'
        }
      ], [
        {
          content: 'Value 1',
          type: 'text'
        }, {
          content: 'Value 2',
          type: 'text'
        }, {
          content: 'Value 3',
          type: 'text'
        }
      ]
    ],
    headers: [{
      canSort: true,
      content: 'Column 1',
      key: 'column_1',
      type: 'text'
    }, {
      canSort: false,
      content: 'Column 2',
      key: 'column_2',
      type: 'text'
    }, {
      canSort: true,
      content: 'Column 3',
      key: 'column_3',
      type: 'text'
    }]
  };

  public dropDownItems: Array<DropdownItemModel> = [{
    iconName: 'menu',
    text: 'Item 1'
  }, {
    iconName: 'menu',
    text: 'Item 2'
  }, {
    iconName: 'menu',
    text: 'Item 3'
  }];

  public date = new Date(2019, 11, 25);

  onTableSort(sortedColum: SortedColumnModel) {
  }
}
