import { Component, OnInit } from '@angular/core';
import { PatientsService } from '../services/patients.service';
import { IPatient } from '../interfaces/patient';
import { PathologiesService } from '../services/pathologies.service';
import { IPathology } from '../interfaces/pathology';
import Swal from 'sweetalert2'



@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {


  patients: IPatient[] = []
  pathologies: IPathology[] = []
  showModal = false;

  constructor(private _patientsSerive: PatientsService, private _pathologiesService: PathologiesService) { }

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients(): void {

    this._patientsSerive.getPatients().subscribe({
      next: (res) => {
        this.patients = res;
        console.log(JSON.stringify(res, null, 2));

      },
      error: (err) => {
        console.error("ERROR:", err);

      },
      complete: () => { }
    })

  }

  deletePatient(id: string | undefined): void {

  }

  showPathologies(pathologies: string[]): void {
    this._pathologiesService.getPathologies(pathologies).subscribe({
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
