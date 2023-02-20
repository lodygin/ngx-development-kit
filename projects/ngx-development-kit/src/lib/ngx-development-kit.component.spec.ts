import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxDevelopmentKitComponent } from './ngx-development-kit.component';

describe('NgxDevelopmentKitComponent', () => {
  let component: NgxDevelopmentKitComponent;
  let fixture: ComponentFixture<NgxDevelopmentKitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxDevelopmentKitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxDevelopmentKitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
