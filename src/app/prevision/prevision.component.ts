import { Component, OnInit } from "@angular/core";
import { User } from "../user";
import { Router } from "@angular/router";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { PrevisionService } from "./../prevision.service";
import { AlerteService } from "./../alerte.service";
@Component({
  selector: "app-prevision",
  templateUrl: "./prevision.component.html",
  styleUrls: ["./prevision.component.css"],
})
export class PrevisionComponent implements OnInit {
  PredictForm: FormGroup;
  submitted = false;
  current_user: any;
  user = new User();
  data = { mois:1, type: 1 };
  number : any;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private alerteService: AlerteService,
    private previsionService: PrevisionService
  
  ) {}
 
  ngOnInit(): void {
    this.PredictForm = this.formBuilder.group(
      {
        mois: [1, [Validators.required, Validators.min(1),Validators.max(12)]],
        type: [1, [Validators.required, Validators.min(0),Validators.max(1)]]
      }
    );
  }
  get f() {
    return this.PredictForm.controls;
  }
  onClickSubmit(formData): void {
    this.submitted = true;
    this.current_user = localStorage.getItem("username");

    this.alerteService.clear();

    if (this.PredictForm.invalid) {
      return;
    }

    this.data.mois = formData.mois;
    this.data.type = formData.type;

    this.previsionService.predictIncident(this.data.type,this.data.mois);
    setTimeout(() => {
    
        this.number = this.previsionService.response.prevision;
        //console.log(this.previsionService.response);
    
    }, 700);
  }
}
