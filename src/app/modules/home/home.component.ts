import { CustomTable, SortedColumn } from '../../components/custom-table/custom-table.model';
import { Component } from '@angular/core';
import { CustomDropdownItem } from '../../components/custom-dropdown/custom-dropdown.model';
import { CustomRadioOption } from 'src/app/components/custom-radio/custom.radio.model';
import { CustomSelectOption } from '../../components/custom-select/custom-select.model';

@Component({
  selector: 'home-page',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  public tableData: CustomTable = {
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
  }

  public selectOptions: Array<CustomSelectOption> = [{
    content: 'Option1',
    value: '1'
  }, {
    content: 'Option2',
    value: '2'
  }];

  public radioOptions: Array<CustomRadioOption> = [{
    content: 'Option1',
    value: '1'
  }, {
    content: 'Option2',
    value: '2'
  }, {
    content: 'Option3',
    value: '3'
  }];

  public dropDownItems: Array<CustomDropdownItem> = [{
    iconName: 'menu',
    text: 'Item 1'
  }, {
    iconName: 'menu',
    text: 'Item 2'
  }, {
    iconName: 'menu',
    text: 'Item 3'
  }];

  onTableSort(sortedColum: SortedColumn) {
  }
}
