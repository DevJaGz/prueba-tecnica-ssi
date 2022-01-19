import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IPatient } from '../interfaces/patient';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  private baseUrl: string = environment.baseUrl;
  constructor(private _http: HttpClient) { }

  getPatients(): Observable<IPatient[]> {
    const url = `${this.baseUrl}/patient-list/`
    return this._http.get<IPatient[]>(url)
  }

  createPatient(patient: IPatient): Observable<IPatient> {
    const url = `${this.baseUrl}/patient-create/`
    return this._http.post<IPatient>(url, patient)
  }

  deletePatient(id: string | undefined): Observable<IPatient> {
    const url = `${this.baseUrl}/patient-delete/${id}/`
    return this._http.delete<IPatient>(url)
  }


}
