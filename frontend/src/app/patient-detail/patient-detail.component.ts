import { Component, OnInit } from '@angular/core';
import { IPatient } from '../interfaces/patient';
import { IPathology } from '../interfaces/pathology';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss']
})
export class PatientDetailComponent implements OnInit {
  patient: IPatient = {
    documentType: "Cc",
    documentId: 0,
    firstName: "",
    secondName: "",
    firstSurname: "",
    secondSurname: "",
    pathologies: []
  }

  pathology: string = ""
  pathologies: IPathology[] = []
  
  constructor() { }

  ngOnInit(): void {
  }

}
