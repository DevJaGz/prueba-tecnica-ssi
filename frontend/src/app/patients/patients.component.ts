import { Component, OnInit } from '@angular/core';
import { PatientsService } from '../services/patients.service';
import { IPatient } from '../interfaces/patient';
import { PathologiesService } from '../services/pathologies.service';
import { IPathology } from '../interfaces/pathology';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';



@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {


  patients: IPatient[] = []
  pathologies: IPathology[] = []
  showModal = false;
  patientName = ""
  documentsType = environment.documentsType;
  constructor(private _patientsService: PatientsService, private _router: Router) { }

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients(): void {

    this._patientsService.getPatients().subscribe({
      next: (res) => {


        this.patients = res;

        // console.log(JSON.stringify(res, null, 2));

      },
      error: (err) => {
        console.error("ERROR:", err);

      },
      complete: () => { }
    })

  }

  deletePatient(id: string | undefined): void {
    this._patientsService.deletePatient(id).subscribe({
      next: (res) => {
        this.getPatients()
        // console.log(JSON.stringify(res, null, 2));

      },
      error: (err) => {
        console.error("ERROR:", err);

      },
      complete: () => { }
    })
  }

  editPatient(id: string | undefined): void {
    this._router.navigate(['/patient-detail', id])
  }

  showPathologies(patient: IPatient): void {
    this.pathologies = patient.pathologies;
    this.patientName = `${patient.firstName} ${patient.secondName} ${patient.firstSurname} ${patient.secondSurname}`
  }

  getDocumentType(patient: IPatient): string {
    const documentTypeId = this.documentsType.filter(documentType => documentType.value == patient.documentType)[0]
    if (documentTypeId?.value) return documentTypeId.label
    else return "-"

  }

}
