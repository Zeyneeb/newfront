import { User } from './../user';
import { AlerteService } from './../alerte.service';
import { AuthenticationService } from "./../authentication.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;

  constructor(private router: Router,
    private alerteService: AlerteService,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {

    if (this.authenticationService.currentUserValue) 
      this.router.navigate(['/home']);

  }
  user = new User();

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }
  get f() {
    return this.loginForm.controls;
  }

  onClickSubmit(formData) {
    this.submitted = true;

    this.alerteService.clear();

    if (this.loginForm.invalid) {
      return;
    }

    this.user.username = formData.username;
    this.user.password = formData.password;
    this.authenticationService.login(this.user);
    setTimeout(() => {
      if(this.authenticationService.response.message.toString().includes("as"))
      {
        this.router.navigate([this.returnUrl]);
      }
      else if(this.authenticationService.response.message.toString().includes("Wrong") ||
      this.authenticationService.response.message.toString().includes("doesn't"))
      {
        this.alerteService.error(
          this.authenticationService.response.message.toString()
        );
      }
 
    }, 700);
  }
}
