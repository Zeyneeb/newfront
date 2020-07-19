import { AuthenticationService } from './authentication.service';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { AlertesComponent } from './alertes/alertes.component';
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { HttpClientModule, HTTP_INTERCEPTORS  } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AjoutCompteComponent } from "./ajout-compte/ajout-compte.component";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from './home/home.component';
import { ComptesComponent } from './comptes/comptes.component';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { DataTablesModule } from 'angular-datatables';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbModule, NgbToastConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorInterceptor } from './interceptor/errors.interceptor';
import { InternalErrorComponent } from './internal-error/internal-error.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EmailFormComponent } from './email-form/email-form.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NARComponent } from './nar/nar.component';
import { CellulesComponent } from './cellules/cellules.component';
import { IncidentsComponent } from './incidents/incidents.component';
import { ClassificationComponent } from './classification/classification.component';
import { TechnicienComponent } from './technicien/technicien.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskComponent } from './task/task.component';
import { PrevisionComponent } from './prevision/prevision.component';






@NgModule({
  declarations: [AppComponent, LoginComponent, AjoutCompteComponent, AlertesComponent, HomeComponent, ComptesComponent, InternalErrorComponent, ResetPasswordComponent, EmailFormComponent, ChangePasswordComponent, NARComponent, CellulesComponent, IncidentsComponent, ClassificationComponent, TechnicienComponent, DashboardComponent, TaskComponent, PrevisionComponent],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxPaginationModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,
    NgbModule,
    DataTablesModule, 
    Ng2SearchPipeModule,
    ToastrModule.forRoot()
  ],
  providers: [
    HttpErrorInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  entryComponents: [ComptesComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
