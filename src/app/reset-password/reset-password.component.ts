import { ResetPasswordService } from './../reset-password.service';
import { AlerteService } from './../alerte.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from '../user';
import { MustMatch } from '../custom-validation.directive';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  user = new User();
  resetForm: FormGroup;
  submitted = false;
  reset_token : any;

  constructor(private router: Router, private formBuilder: FormBuilder, private alerteService: AlerteService, private resetService: ResetPasswordService) { }

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      cpassword: ['', Validators.required]
  }, {
      validator: MustMatch('password', 'cpassword')
  });
  }

  get f() { 
    return this.resetForm.controls; 
  }

  onClickSubmit(formData): void {

    this.submitted = true;
    this.alerteService.clear();
    if (this.resetForm.invalid) {
      return;
  }
    this.user.password = formData.password;
    this.reset_token = localStorage.getItem('reset_token');
    this.resetService.modifier_mdp(this.reset_token, formData.password);
      this.alerteService.success("Password reset successful")
         setTimeout(() => {this.router.navigate(['/']); }, 750);

        //else { this.alerteService.error("Network Error");  }
  

}
}
