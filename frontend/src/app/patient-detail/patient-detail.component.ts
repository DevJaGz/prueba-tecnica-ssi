import { Component, OnInit } from '@angular/core';
import { IPatient } from '../interfaces/patient';
import { IPathology } from '../interfaces/pathology';
import { PathologiesService } from '../services/pathologies.service';
import { PatientsService } from '../services/patients.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss']
})
export class PatientDetailComponent implements OnInit {
  documentsType = environment.documentsType;
  patient: IPatient = {
    documentType: this.documentsType[0].value,
    documentId: null,
    firstName: "",
    secondName: "",
    firstSurname: "",
    secondSurname: "",
    pathologies: []
  }
  id: string | null = null;
  pathologies: IPathology[] = []

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _pathologiesService: PathologiesService,
    private _patientsService: PatientsService) { }

  ngOnInit(): void {
    this.getPathologies()
    this.id = this._activatedRoute.snapshot.paramMap.get('id')
    if (this.id) {
      this.getPatientDetail(this.id)
    }
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

  getPatientDetail(id: string | undefined): void {
    this._patientsService.getPatient(id).subscribe({
      next: (res) => {
        this.patient = res;
        // console.log(JSON.stringify(res, null, 2));
      },
      error: (err) => {
        console.error("ERROR:", err);
      },
      complete: () => { }
    })
  }

  createPatient(): void {
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

  updatePatient(): void {
    this._patientsService.updatePatient(this.patient, this.id).subscribe({
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

  onSubmit(patientForm: NgForm): void {

    if (patientForm.invalid) {
      patientForm.control.markAllAsTouched()
      return
    }

    if (this.id) this.updatePatient()
    else this.createPatient()



  }

}
