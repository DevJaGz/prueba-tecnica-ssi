import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IPathology } from '../interfaces/pathology';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PathologiesService {

  private baseUrl: string = environment.baseUrl;
  constructor(private _http: HttpClient) { }

  getPathologies(): Observable<IPathology[]> {
    const url = `${this.baseUrl}/pathology-list/`
    return this._http.get<IPathology[]>(url)
  }

}
