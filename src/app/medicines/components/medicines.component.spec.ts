import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { MedicinesComponent } from './medicines.component';
import { IMedicineResponseDTO } from '../dtos/IMedicinesDTO';

describe('MedicinesComponent', () => {
  let component: MedicinesComponent;
  let fixture: ComponentFixture<MedicinesComponent>;
  let debugEl: DebugElement;
  const fakeActivatedRoute = {
    queryParams: of({ page: 1, per_page: 5 }),
  };

  const medicineList: IMedicineResponseDTO[] = [
    {
      id: 1,
      name: 'Diapet',
      description: 'Diapet merupakan obat herbal yang mengandung ekstrak jambu biji',
      price: 3000,
      stock: 999,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicinesComponent, HttpClientTestingModule],
      providers: [{ provide: ActivatedRoute, useValue: fakeActivatedRoute }],
    }).compileComponents();

    fixture = TestBed.createComponent(MedicinesComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    fixture.detectChanges();
  });

  beforeEach(async () => {
    component.medicines = medicineList;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onGetMedicines', () => {
    spyOn(component, 'onGetMedicines');
    component.onGetMedicines();
    expect(component.onGetMedicines).toHaveBeenCalled();
  });
});
