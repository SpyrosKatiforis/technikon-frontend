import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyOwnerHomeComponent } from './property-owner-home.component';

describe('PropertyOwnerHomeComponent', () => {
  let component: PropertyOwnerHomeComponent;
  let fixture: ComponentFixture<PropertyOwnerHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyOwnerHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyOwnerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
