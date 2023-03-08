import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NgxTrackByDirective } from './ngx-track-by.directive';

describe('NgxTrackByDirective', () => {
  @Component({
    template: `
      <div *ngFor="let user of users; ngxTrackBy: 'id'">
        <p>{{ user.name }}</p>
      </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  class TestComponent {
    public users = [
      { id: '1', name: 'David' },
      { id: '2', name: 'Mark' },
      { id: '3', name: 'Bennett' },
      { id: '4', name: 'Oliver' },
    ];
  }

  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [NgxTrackByDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should show 4 paragraphs', () => {
    expect(fixture.debugElement.queryAll(By.css('p')).length).toBe(4);
  });
});
