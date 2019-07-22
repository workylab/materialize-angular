import { Component, Input } from '@angular/core';
import { CardModel } from './card.model';
import { config } from '../../config';

@Component({
  selector: `${ config.components.prefix }-card }`,
  templateUrl: './card.component.html'
})
export class CardComponent implements CardModel {
  static readonly defaultProps: CardModel = { className: ''};

  @Input() className: string = CardComponent.defaultProps.className;

  public prefix = config.components.prefix;
}
