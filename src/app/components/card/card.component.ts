import { Component } from '@angular/core';
import { config } from '../../config';

@Component({
  selector: `${ config.components.prefix }-card }`,
  templateUrl: './card.component.html'
})
export class CardComponent {
  public classPrefix = config.components.prefix;
}
