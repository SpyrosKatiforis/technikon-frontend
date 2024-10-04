import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyOwnerPropertiesComponent } from './property-owner-properties.component';

describe('PropertyOwnerPropertiesComponent', () => {
  let component: PropertyOwnerPropertiesComponent;
  let fixture: ComponentFixture<PropertyOwnerPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyOwnerPropertiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyOwnerPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
