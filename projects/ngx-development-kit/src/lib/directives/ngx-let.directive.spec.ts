import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

import { NgxLetContext, NgxLetDirective } from './ngx-let.directive';

describe('NgxLetDirective', () => {
  @Component({
    template: ` <div #ref *ngxLet="letter as value">{{ value }}{{ value }}{{ value }}</div> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  class TestComponent {
    @ViewChild('ref') public elRef!: ElementRef<HTMLElement>;

    public count = 0;

    public get letter(): string {
      this.count++;
      return 'a';
    }
  }

  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [NgxLetDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call getter once', () => {
    expect(component.count).toBe(1);
  });

  it('should show result 3 times', () => {
    expect(component.elRef.nativeElement.textContent).toBe('aaa');
  });

  describe('ngTemplateContextGuard', () => {
    it('should return true', () => {
      const mockViewContainerRef = {} as ViewContainerRef;
      const mockTemplateRef = {} as TemplateRef<NgxLetContext<unknown>>;

      expect(
        NgxLetDirective.ngTemplateContextGuard(
          new NgxLetDirective<unknown>(mockViewContainerRef, mockTemplateRef),
          {},
        ),
      ).toBeTrue();
    });
  });

  describe('NgxLetContext', () => {
    it('should have $implicit and ngxLet variables equal to a directive input value', () => {
      const inputValue = { data: '123' };
      const dir = { ngxLet: inputValue };
      const ctx = new NgxLetContext<typeof inputValue>(dir);

      expect(ctx.$implicit).toEqual({ data: '123' });
      expect(ctx.ngxLet).toEqual({ data: '123' });
    });
  });
});
