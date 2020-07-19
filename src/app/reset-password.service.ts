import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cpus } from 'os';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  response = { reset_token: String, message: ""};

  constructor(private http: HttpClient) { }
  clear = () => {
    this.response.message = "";
  };

  envoyer_email(user: any) {
    this.http
      .post<any>("http://localhost:5000/forgot", user)
      .subscribe(data => {
        (this.response.reset_token = data.reset_token),
        (this.response.message = data.message);
        localStorage.setItem("reset_token", data.reset_token);
      })
  }

  modifier_mdp(reset_token: any, password: any) {
    this.http
      .post<any>(`http://localhost:5000/reset/${reset_token}/${password}`,{})
      
      .subscribe( data => (this.response.message = data.message));
  }

  changer_mdp(username: any, change: any) {
    this.http
    .post<any>(`http://localhost:5000/change/${username}`, change)
    
    .subscribe( data => (this.response.message = data.message));
}

  }
  

