import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IPathology } from '../interfaces/pathology';


@Injectable({
  providedIn: 'root'
})
export class PathologiesService {

  private baseUrl: string = environment.baseUrl;
  constructor(private _http: HttpClient) { }

  getPathologies(pathologies: string[]) {
    const url = `${this.baseUrl}/pathologies`
    return this._http.post<IPathology[]>(url, { pathologiesId: pathologies })
  }

}
