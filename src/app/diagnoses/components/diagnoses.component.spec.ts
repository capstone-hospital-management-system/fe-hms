import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { DiagnosesComponent } from './diagnoses.component';

describe('DiagnosesComponent', () => {
  let component: DiagnosesComponent;
  let fixture: ComponentFixture<DiagnosesComponent>;
  const fakeActivatedRoute = {
    queryParams: of({ page: 1, per_page: 5 }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiagnosesComponent, HttpClientTestingModule],
      providers: [{ provide: ActivatedRoute, useValue: fakeActivatedRoute }],
    }).compileComponents();

    fixture = TestBed.createComponent(DiagnosesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
