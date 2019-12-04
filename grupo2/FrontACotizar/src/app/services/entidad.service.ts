import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_BACKEND } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class EntidadService {

  constructor(private _sHttp:HttpClient) { }
  getEntidad():Observable<any>
  {
    return this._sHttp.get(`${URL_BACKEND}/entidad`);
  }
  postEntidad(objEntidad): Observable<any> {
    let objEntidadString = JSON.stringify(objEntidad);
    let misHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this._sHttp.post(`${URL_BACKEND}/entidad`, objEntidadString, { headers: misHeaders });
  }
  getEntidadById(id): Observable<any> {
    return this._sHttp.get(`${URL_BACKEND}/entidad/${id}`);
  }
  putEntidad(objEntidad): Observable<any> {
    let objEntidadString = JSON.stringify(objEntidad);
    let misHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this._sHttp.put(`${URL_BACKEND}/entidad`, objEntidadString, { headers: misHeaders })
  }
  deleteEntidad(id):Observable<any>
  {
    return this._sHttp.delete(`${URL_BACKEND}/entidad/${id}`);
  }

}
