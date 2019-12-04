import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_BACKEND } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private _sHttp:HttpClient) { }
  getPersona():Observable<any>
  {
    return this._sHttp.get(`${URL_BACKEND}/persona`);
  }
  postPersona(objPersona): Observable<any> {
    let objPersonaString = JSON.stringify(objPersona);
    let misHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this._sHttp.post(`${URL_BACKEND}/persona`, objPersonaString, { headers: misHeaders });
  }
  getPersonaById(id): Observable<any> {
    return this._sHttp.get(`${URL_BACKEND}/persona/${id}`);
  }
  putPersona(objPersona): Observable<any> {
    let objPersonaString = JSON.stringify(objPersona);
    let misHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this._sHttp.put(`${URL_BACKEND}/persona`, objPersonaString, { headers: misHeaders })
  }
  deletePersona(id):Observable<any>
  {
    return this._sHttp.delete(`${URL_BACKEND}/persona/${id}`);
  }

}
