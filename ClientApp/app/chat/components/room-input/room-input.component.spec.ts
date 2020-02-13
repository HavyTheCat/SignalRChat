import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomInputComponent } from './room-input.component';

describe('RoomInputComponent', () => {
  let component: RoomInputComponent;
  let fixture: ComponentFixture<RoomInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
