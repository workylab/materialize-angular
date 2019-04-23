import { CollapsibleModel } from '../collapsible/collapsible.model';

export interface AccordionModel {
  className: string;
  items: Array<CollapsibleModel>;
}
