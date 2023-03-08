import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

import { NgxEmptyDirective } from './ngx-empty.directive';

describe('NgxEmptyDirective', () => {
  @Component({
    template: `
      <ng-container *ngFor="let item of items$ | async; ngxEmpty: emptyRef">
        <p>{{ item }}</p>
      </ng-container>

      <ng-template #emptyRef>
        <p>Empty</p>
      </ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  class TestComponent {
    public items$ = new BehaviorSubject<string[]>([]);
  }

  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [NgxEmptyDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show paragraph with Empty text', () => {
    expect(fixture.debugElement.queryAll(By.css('p')).length).toBe(1);
    expect(fixture.debugElement.nativeElement.textContent).toBe('Empty');
  });

  it('should not interfere with *ngFor', () => {
    component.items$.next(['1', '2', '3', '4']);
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('p')).length).toBe(4);
    expect(fixture.debugElement.nativeElement.textContent).toBe('1234');
  });
});
