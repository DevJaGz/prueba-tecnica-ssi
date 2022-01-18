import { IPathology } from "./pathology";

export interface IPatient {
  documentType: string;
  documentId: number;
  firstName: string;
  SecondName: string;
  firstSurname: string;
  secondSurname: string;
  pathologies: IPathology[];
}
