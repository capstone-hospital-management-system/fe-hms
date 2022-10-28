import { IDiagnoseResponseDTO } from 'src/app/diagnoses/dtos/IDiagnosesDTO';
import { IMedicineResponseDTO } from 'src/app/medicines/dtos/IMedicinesDTO';

export interface IPrescription {
  diagnose: IDiagnoseResponseDTO;
  description: string;
  status: string;
  others: string;
}

export interface IPrescriptionResponseDTO extends IPrescription {
  id: number;
  medicines: IMedicineResponseDTO[];
  created_at: number | Date;
  updated_at: number | Date;
}

export interface IPrescriptionRequestDTO extends IPrescription {}
