import { PrevisionComponent } from "./prevision/prevision.component";
import { TaskComponent } from "./task/task.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ClassificationComponent } from "./classification/classification.component";
import { TechnicienComponent } from "./technicien/technicien.component";
import { IncidentsComponent } from "./incidents/incidents.component";
import { CellulesComponent } from "./cellules/cellules.component";
import { NARComponent } from "./nar/nar.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { EmailFormComponent } from "./email-form/email-form.component";
import { ComptesComponent } from "./comptes/comptes.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { AjoutCompteComponent } from "./ajout-compte/ajout-compte.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./auth.guard";
import { Role } from "./Role";
import { InternalErrorComponent } from "./internal-error/internal-error.component";

const routes: Routes = [
  { path: "", component: LoginComponent },
  {
    path: "ajout",
    component: AjoutCompteComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, "Admin"] },
  },
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: "comptes",
    component: ComptesComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, "Admin"] },
  },
  { path: "interr", component: InternalErrorComponent },
  { path: "email", component: EmailFormComponent },
  { path: "reset", component: ResetPasswordComponent },
  { path: "change", component: ChangePasswordComponent },
  { path: "nar", component: NARComponent },
  { path: "cells", component: CellulesComponent },
  { path: "incidents", component: IncidentsComponent },
  { path: "technicien", component: TechnicienComponent },
  { path: "classification", component: ClassificationComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "task", component: TaskComponent },
  { path: "prevision", component: PrevisionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
