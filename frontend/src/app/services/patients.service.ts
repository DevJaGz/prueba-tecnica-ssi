import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IPatient } from '../interfaces/patient';


@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  private baseUrl: string = environment.baseUrl;
  constructor(private _http: HttpClient) { }

  getPatients() {
    const url = `${this.baseUrl}/patient-list/`
    return this._http.get<IPatient[]>(url)
  }
}
