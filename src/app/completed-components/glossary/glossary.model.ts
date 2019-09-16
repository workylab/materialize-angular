import { ScrollSpyComponent } from '../scroll-spy/scroll-spy.component';

export interface GlossaryModel {
  className: string;
  scrollSpy: ScrollSpyComponent | null;
  topSpace: number;
}
