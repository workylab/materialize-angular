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

  it('should showNext call toggleCollapsibles with next index', () => {
    const nextIndex = component.activeIndex + 1;

    spyOn(component, 'toggleCollapsibles');

    expect(component.toggleCollapsibles).not.toHaveBeenCalled();

    component.showNext();

    expect(component.toggleCollapsibles).toHaveBeenCalledWith(nextIndex);
  });

  it('should showPrev call toggleCollapsibles with previous index', () => {
    const prevIndex = component.activeIndex - 1;

    spyOn(component, 'toggleCollapsibles');

    expect(component.toggleCollapsibles).not.toHaveBeenCalled();

    component.showPrev();

    expect(component.toggleCollapsibles).toHaveBeenCalledWith(prevIndex);
  });
});
