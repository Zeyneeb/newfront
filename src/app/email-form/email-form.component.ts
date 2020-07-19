import { ResetPasswordService } from './../reset-password.service';
import { AlerteService } from './../alerte.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UrlSegment, Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent implements OnInit {

  emailForm: FormGroup;
  submitted = false;
  user = new User();

  constructor(private resetService: ResetPasswordService, private router: Router, private formBuilder: FormBuilder, private alerteService: AlerteService, private resetpasswordService: ResetPasswordService) { }

  ngOnInit(): void {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get f() { 
    return this.emailForm.controls; 
  }

  onClickSubmit(formData) {
    this.submitted = true;

    this.alerteService.clear();

    if (this.emailForm.invalid) {
      return;
    }

    this.user.email = formData.email;
    this.resetpasswordService.envoyer_email(this.user);

    setTimeout(() => {
   
    if (this.resetService.response.message.toString().includes("envoyé")) {
      this.alerteService.success( this.resetService.response.message.toString(), true)
      this.resetService.clear();
    }
    else if (this.resetService.response.message
        .toString()
        .includes("doesn't")){
          this.alerteService.error(this.resetService.response.message.toString(), true);
      }
  }, 750);
}

}
