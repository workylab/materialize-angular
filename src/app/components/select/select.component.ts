import {
  AfterContentInit,
  Component,
  ContentChildren,
  forwardRef,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { FormFieldAbstract } from '../form/form-field.abstract';
import { getBooleanValue } from '../../utils/get-boolean-value.util';
import { SelectModel } from './select.model';
import { SelectOptionComponent } from '../select-option/select-option.component';

@Component({
  providers: [{
    provide: FormFieldAbstract,
    useExisting: forwardRef(() => SelectComponent)
  }],
  selector: 'materialize-select',
  styleUrls: ['./select.component.scss'],
  templateUrl: './select.component.html'
})
export class SelectComponent extends FormFieldAbstract implements OnInit, AfterContentInit {
  static readonly defaultProps: SelectModel = {
    className: '',
    disabled: false,
    floatLabel: '',
    id: '',
    name: '',
    required: false,
    value: ''
  };

  @ViewChild('labelContainer', { read: ViewContainerRef }) labelContainerRef: ViewContainerRef;

  @ContentChildren(SelectOptionComponent) optionsQueryList: QueryList<SelectOptionComponent>;

  @Input('className') classNameInput: string;
  @Input('disabled') disabledInput: boolean;
  @Input('floatLabel') floatLabelInput: string;
  @Input('id') idInput: string;
  @Input('name') nameInput: string;
  @Input('required') requiredInput: boolean;
  @Input('value') valueInput: string;

  public className: string;
  public disabled: boolean;
  public floatLabel: string;
  public id: string;
  public isFocused: boolean;
  public isTouched: boolean;
  public name: string;
  public options: Array<SelectOptionComponent>;
  public required: boolean;
  public valueLabel: string;
  public value: string;

  constructor() {
    super();

    this.selectOption = this.selectOption.bind(this);
  }

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = SelectComponent;

    this.className = this.classNameInput || defaultProps.className;
    this.disabled = getBooleanValue(this.disabledInput, defaultProps.disabled);
    this.floatLabel = this.floatLabelInput || defaultProps.floatLabel;
    this.id = this.idInput || defaultProps.id;
    this.name = this.nameInput || defaultProps.name;
    this.required = getBooleanValue(this.requiredInput, defaultProps.required);
    this.value = this.valueInput || defaultProps.value;

    this.isFocused = false;
    this.isTouched = false;
  }

  ngAfterContentInit() {
    this.options = this.optionsQueryList.toArray();

    this.registerOptions();

    if (this.disabled) {
      //
    }
  }

  registerOptions() {
    for (let i = 0; i < this.options.length; i++) {
      const currentOption = this.options[i];

      currentOption.isActive = (currentOption.value === this.value);

      currentOption.onClickEmitter.subscribe(this.selectOption);
    }
  }

  getIndexOption(value: string, options: Array<SelectOptionComponent>): number | null {
    for (let i = 0; i < options.length; i++) {
      const currentOption = options[i];

      if (value === currentOption.value) {
        return i;
      }
    }

    return null;
  }

  selectOption(value: string) {
    const selectOption = this.options.find(item => item.value === value);

    if (selectOption) {
      this.labelContainerRef.clear();

      const view = selectOption.template.createEmbeddedView(null);

      this.labelContainerRef.insert(view);
      this.value = value;
      this.closeMenu();
    }
  }

  openMenu() {
    if (!this.disabled) {
      this.isFocused = true;
    }
  }

  closeMenu() {
    this.isTouched = true;
    this.isFocused = false;
  }
}
