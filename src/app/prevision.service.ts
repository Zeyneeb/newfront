import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class PrevisionService {
response = { prevision : 0 };
datas: any;
  constructor(private http: HttpClient) { }

  public predictIncident(type: Number, month: Number ) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    });
    let options = { headers: headers };
    this.datas = {"type" : type, "month" : month }
    return this.http.post<any>(`http://localhost:5000/prediction`,this.datas).subscribe(data => {
      this.response.prevision = data.prediction;
    });
}
}
