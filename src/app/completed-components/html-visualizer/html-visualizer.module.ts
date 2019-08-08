import { CommonModule } from '@angular/common';
import { HTMLVisualizerComponent } from './html-visualizer.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [HTMLVisualizerComponent],
  exports: [HTMLVisualizerComponent],
  imports: [CommonModule]
})
export class MaterializeHTMLVisualizerModule {
}
