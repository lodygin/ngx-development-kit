import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgForOf } from '@angular/common';
import { By } from '@angular/platform-browser';

import { NgxTrackByDirective } from './ngx-track-by.directive';

describe('NgxTrackByDirective', () => {
  @Component({
    template: `
      <div #ref *ngFor="let user of users; ngxTrackBy: 'id'">
        <p>{{ user.name }}</p>
      </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  class TestComponent {
    @ViewChild('ref') public elRef!: ElementRef<HTMLElement>;

    public users = [
      { id: '1', name: 'David' },
      { id: '2', name: 'Mark' },
      { id: '3', name: 'Bennett' },
      { id: '4', name: 'Oliver' },
    ];
  }

  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [NgForOf, NgxTrackByDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show 4 paragraphs', () => {
    expect(fixture.debugElement.queryAll(By.css('p')).length).toBe(4);
  });
});
