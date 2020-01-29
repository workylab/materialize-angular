/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccordionComponent } from './accordion.component';

describe('AccordionComponent', () => {
  let component: AccordionComponent;
  let fixture: ComponentFixture<AccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(
      {
        declarations: [AccordionComponent]
      }
    ).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default properties', () => {
    const { activeIndex, className } = AccordionComponent.defaultProps;

    expect(component.activeIndex).toEqual(activeIndex);
    expect(component.className).toEqual(className);
  });

  it('should showNext call toggleCollapsibles with null when there are not more collapsibles to show', () => {
    component.activeIndex = 0;

    spyOn(component, 'toggleCollapsibles');

    expect(component.toggleCollapsibles).not.toHaveBeenCalled();

    component.showNext();

    expect(component.toggleCollapsibles).toHaveBeenCalledWith(null);
  });

  it('should showPrev call toggleCollapsibles with null when there are not more collapsibles to show', () => {
    component.activeIndex = 0,

    spyOn(component, 'toggleCollapsibles');

    expect(component.toggleCollapsibles).not.toHaveBeenCalled();

    component.showPrev();

    expect(component.toggleCollapsibles).toHaveBeenCalledWith(null);
  });
});
