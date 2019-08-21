import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BUTTON_LEVEL } from './button.model';
import { ButtonComponent } from './button.component';
import { MaterializeCommonModule } from '../common/common.module';
import { config } from 'src/app/config';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(
      {
        declarations: [ButtonComponent],
        imports: [MaterializeCommonModule]
      }
    ).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default properties', () => {
    const { className, disabled, level, rippleDuration, type } = ButtonComponent.defaultProps;

    expect(component.className).toEqual(className);
    expect(component.disabled).toEqual(disabled);
    expect(component.level).toEqual(level);
    expect(component.rippleDuration).toEqual(rippleDuration);
    expect(component.type).toEqual(type);
  });

  it('should contain the default button class name', () => {
    const compile = fixture.debugElement.nativeElement;
    const button = compile.firstChild;
    const defaultClassName = config.components.prefix + '-button';

    expect(button.className).toContain(defaultClassName);
  });

  it('should change button class name', () => {
    const compile = fixture.debugElement.nativeElement;
    const button = compile.firstChild;
    const newClassName = 'button-test';

    expect(button.className).not.toContain(newClassName);

    component.className = newClassName;
    fixture.detectChanges();

    expect(button.className).toContain(newClassName);
  });

  it('should has the correct level', () => {
    const compile = fixture.debugElement.nativeElement;
    const button = compile.firstChild;
    const newLevel: BUTTON_LEVEL = BUTTON_LEVEL.OUTLINE;

    expect(button.className).not.toContain(newLevel);

    component.level = newLevel;
    fixture.detectChanges();

    expect(button.className).toContain(newLevel);
  });
});
