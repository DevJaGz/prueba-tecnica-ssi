import { Component, OnInit } from '@angular/core';
import { IPatient } from '../interfaces/patient';
import { IPathology } from '../interfaces/pathology';
import { PathologiesService } from '../services/pathologies.service';

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

  constructor(private _pathologiesService: PathologiesService) { }

  ngOnInit(): void {
    this.getPathologies()
  }

  getPathologies(): void {
    this._pathologiesService.getPathologies().subscribe({
      next: (res) => {
        this.pathologies = res;
        console.log(JSON.stringify(res, null, 2));

      },
      error: (err) => {
        console.error("ERROR:", err);

      },
      complete: () => { }
    })
  }

}
