import { ResetPasswordService } from './../reset-password.service';
import { AlerteService } from './../alerte.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MustMatch } from '../custom-validation.directive';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changeForm: FormGroup;
  submitted = false;
  current_user:any;
  user = new User();
  change={password:"",newpassword:""}

  constructor(private router: Router, private formBuilder: FormBuilder, private alerteService: AlerteService, private resetService: ResetPasswordService) { }

  ngOnInit(): void {
    this.changeForm = this.formBuilder.group({
      password: ['', Validators.required],
      newpassword: ['', [Validators.required, Validators.minLength(6)]],
      cpassword: ['', Validators.required]
  }, {
      validator: MustMatch('newpassword', 'cpassword')
  });
  }

  get f() { 
    return this.changeForm.controls; 
  }

  onClickSubmit(formData): void {
    this.submitted = true;
    this.current_user = localStorage.getItem("username");

    this.alerteService.clear();

    if (this.changeForm.invalid) {
      return;
  }

  this.change.password = formData.password;
  this.change.newpassword = formData.newpassword;

  this.resetService.changer_mdp(this.current_user, this.change );
  setTimeout(() => {
    if(this.resetService.response.message.toString().includes("changed"))
    {
      this.alerteService.success(this.resetService.response.message.toString());
    }
    else if(this.resetService.response.message.toString().includes("Invalid"))
    {
      this.alerteService.error(
        this.resetService.response.message.toString()
      );
    }

  }, 700);
  
}

}
