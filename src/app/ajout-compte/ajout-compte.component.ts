import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AlerteService } from './../alerte.service';
import { User } from "./../user";
import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../authentication.service";
import { RouterModule, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '../custom-validation.directive';

@Component({
  selector: "app-ajout-compte",
  templateUrl: "./ajout-compte.component.html",
  styleUrls: ["./ajout-compte.component.css"]
})
export class AjoutCompteComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService, private formBuilder: FormBuilder, private alerteService: AlerteService,private router:Router) {}

  user = new User();
  registerForm: FormGroup;
  submitted = false;
  role:any;

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cpassword: ['', Validators.required]
  }, {
      validator: MustMatch('password', 'cpassword')
  });

this.role=localStorage.getItem('role');
console.log(this.role)
  }
  redirect(){
    this.router.navigate(['/home']);
  }
  allow(){
    this.router.navigate(['/ajout']);
  }
  get f() { 
    return this.registerForm.controls; 
  }
  

  onClickSubmit(formData): void {
    this.submitted = true;

    this.alerteService.clear();

    if (this.registerForm.invalid) {
      return;
  }

    this.user.firstname = formData.firstname;
    this.user.lastname = formData.lastname;
    this.user.username = formData.username;
    this.user.email = formData.email;
    this.user.password = formData.password;
    
    this.authenticationService.ajouter(this.user);
    
    setTimeout(() => {
      if (this.authenticationService.response.message.toString().includes("created")) {
         this.alerteService.success( this.authenticationService.response.message.toString(), true)
         setTimeout(() => {this.router.navigate(['/comptes']); }, 750);
      }
           
        else if (this.authenticationService.response.message.toString().includes("already")) {
          this.alerteService.error(this.authenticationService.response.message.toString(), true)
        }

        //else { this.alerteService.error("Network Error");  }

    }, 750);
}

}
