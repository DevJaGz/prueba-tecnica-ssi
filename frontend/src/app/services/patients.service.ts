import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  constructor(private _http: HttpClient) { }

  getPacientes() {

  }
}
