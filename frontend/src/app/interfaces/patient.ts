import { IPathology } from "./pathology";

export interface IPatient {
  id?: string;
  documentType: string;
  documentId: number;
  firstName: string;
  secondName: string;
  firstSurname: string;
  secondSurname: string;
  pathologies: string[];
}
