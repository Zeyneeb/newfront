import { AlerteService } from "./alerte.service";
import { User } from "./user";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { HttpHeaders } from "@angular/common/http";
import * as _ from "lodash";
import { Config } from "protractor";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  response = { refresh_token: String, message: String, role: String };
  editResponse = { message: "" };
  user = new User();
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private alerteService: AlerteService) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );

    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  getAll() {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    });
    let options = { headers: headers };
    return this.http.get("http://localhost:5000/users", options);
  }

  login(user: any) {
    this.http
      .post<any>("http://localhost:5000/login", user)
      .subscribe((data) => {
        (this.response.refresh_token = data.refresh_token),
          (this.response.message = data.message),
          (this.response.role = data.role);
        if (user && data.refresh_token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem(
            "currentUser",
            JSON.stringify(_.pick(user, ["username"]))
          );
          localStorage.setItem("username", user["username"]);
          localStorage.setItem("jwt", data.refresh_token);
          localStorage.setItem("role", data.role);
          this.currentUserSubject.next(user);
        }

        return user;
      });
  }

  ajouter(user: any) {
    this.http
      .post<any>("http://localhost:5000/registration", user)
      .subscribe((data) => {
        (this.response.refresh_token = data.refresh_token),
          (this.response.message = data.message);
      });
  }

  modifier(username: string, user: any) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    });
    let options = { headers: headers };
    this.http
      .put<any>(`http://localhost:5000/edit/${username}`, user, options)
      .subscribe((data: Config) => (this.editResponse.message = data.message));
  }
  clearEdit = () => {
    this.editResponse.message = "";
  };
  logout() {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    });
    let options = { headers: headers };
    console.log(localStorage.getItem("jwt"), options);
    this.http
      .post<any>("http://localhost:5000/logout/access", null, options)
      .subscribe((data) => {
        console.log(data);
      });
    localStorage.clear();
    this.currentUserSubject.next(null);
  }

  delete(username: any) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    });
    let options = { headers: headers };
    return this.http.delete(
      `http://localhost:5000/delete/${username}`,
      options
    );
  }

  getByUsername(username: any): Observable<any> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    });
    let options = { headers: headers };
    return this.http.get(`http://localhost:5000/find/${username}`, options);
  }
}
