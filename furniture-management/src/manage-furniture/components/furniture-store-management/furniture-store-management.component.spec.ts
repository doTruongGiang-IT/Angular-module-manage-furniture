import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FurnitureStoreManagementComponent } from './furniture-store-management.component';

describe('FurnitureStoreManagementComponent', () => {
  let component: FurnitureStoreManagementComponent;
  let fixture: ComponentFixture<FurnitureStoreManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FurnitureStoreManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FurnitureStoreManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
