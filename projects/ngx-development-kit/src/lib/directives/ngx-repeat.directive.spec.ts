import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NgxRepeatDirective } from './ngx-repeat.directive';
import { BehaviorSubject } from 'rxjs';

describe('NgxRepeatDirective', () => {
  @Component({
    template: ` <p *ngxRepeat="repeatTimes$ | async">Test</p> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  class TestComponent {
    public repeatTimes$ = new BehaviorSubject<number>(3);
  }

  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [NgxRepeatDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show 3 paragraphs', () => {
    expect(fixture.debugElement.queryAll(By.css('p')).length).toBe(3);
    expect(fixture.debugElement.nativeElement.textContent).toBe('TestTestTest');
  });

  it('should show 1 paragraph after changing input value', () => {
    component.repeatTimes$.next(1);
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('p')).length).toBe(1);
    expect(fixture.debugElement.nativeElement.textContent).toBe('Test');
  });
});
