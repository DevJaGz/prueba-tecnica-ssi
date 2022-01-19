import { Component, OnInit } from '@angular/core';
import { IPatient } from '../interfaces/patient';
import { IPathology } from '../interfaces/pathology';
import { PathologiesService } from '../services/pathologies.service';
import { PatientsService } from '../services/patients.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss']
})
export class PatientDetailComponent implements OnInit {
  patient: IPatient = {
    documentType: "Cc",
    documentId: null,
    firstName: "",
    secondName: "",
    firstSurname: "",
    secondSurname: "",
    pathologies: []
  }


  pathologies: IPathology[] = []

  constructor(
    private _router: Router,
    private _pathologiesService: PathologiesService,
    private _patientsService: PatientsService) { }

  ngOnInit(): void {
    this.getPathologies()
  }

  getPathologies(): void {
    this._pathologiesService.getPathologies().subscribe({
      next: (res) => {
        this.pathologies = res;
        // console.log(JSON.stringify(res, null, 2));

      },
      error: (err) => {
        console.error("ERROR:", err);

      },
      complete: () => { }
    })
  }

  onSubmit() {
    this._patientsService.createPatient(this.patient).subscribe({
      next: (res) => {
        this._router.navigate(['/patients']);
        // console.log(JSON.stringify(res, null, 2));
      },
      error: (err) => {
        console.error("ERROR:", err);
      },
      complete: () => { }
    })
  }

}
