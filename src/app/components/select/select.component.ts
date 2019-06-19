import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild
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

  @ViewChild('backdrop') backdropRef: ElementRef;
  @ViewChild('labelContainer') labelContainerRef: ElementRef;

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
  public name: string;
  public options: Array<SelectOptionComponent>;
  public required: boolean;
  public valueLabel: string;
  public value: string;

  constructor(private renderer: Renderer2) {
    super();

    this.close = this.close.bind(this);
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
  }

  ngAfterContentInit() {
    this.options = this.optionsQueryList.toArray();

    this.registerOptions();
  }

  registerOptions() {
    for (let i = 0; i < this.options.length; i++) {
      const currentOption = this.options[i];

      currentOption.isActive = (currentOption.value === this.value);

      currentOption.onClickEmitter.subscribe(this.selectOption);
    }
  }

  desactiveAllOptions() {
    this.options.forEach(option => {
      option.isActive = false;
    });
  }

  selectOption(value: string) {
    const { nativeElement: labelContainer } = this.labelContainerRef;

    this.desactiveAllOptions();
    this.renderer.removeChild(labelContainer, labelContainer.firstChild);

    const selectOption = this.options.find(item => item.value === value);

    if (selectOption) {
      const template = selectOption.template.nativeElement.firstChild;
      const cloned = template.cloneNode(true);

      this.renderer.appendChild(labelContainer, cloned);
      this.value = value;
      this.close();

      selectOption.isActive = true;
    }
  }

  onClick() {
    this.isFocused = true;

    setTimeout(() => {
      this.backdropRef.nativeElement.addEventListener('click', this.close);
    }, 0);
  }

  close() {
    this.isFocused = false;
  }
}
