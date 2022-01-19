import { IPathology } from "./pathology";

export interface IPatient {
  id?: string;
  documentType: string;
  documentId: number | null;
  firstName: string;
  secondName: string;
  firstSurname: string;
  secondSurname: string;
  pathologies: IPathology[];
}
