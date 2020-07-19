import { Component } from "@angular/core";
import { User } from "./user";
import { Router } from "@angular/router";
import { AuthenticationService } from "./authentication.service";
import { Role } from "./Role";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "dashboard";
  currentUser: User;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
    console.log(this.currentUser);
  }

  isAdmin() {
    return localStorage.getItem("role") === Role.Admin;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/"]);
  }
}
