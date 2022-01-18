import { Component, OnInit } from '@angular/core';
import { PatientsService } from '../services/patients.service';
import { IPatient } from '../interfaces/patient';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {


  patients: IPatient[] = []
  constructor(private _patientsSerive: PatientsService) { }

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients(): void {

    this._patientsSerive.getPatients().subscribe({
      next: (res) => {
        this.patients = res;
      },
      error: (err) => {
        console.error("ERROR:", err);

      },
      complete: () => { }
    })

  }

  deletePatient(id: string | undefined): void {

  }

}
