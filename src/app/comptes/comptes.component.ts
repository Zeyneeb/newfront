import { AlerteService } from "./../alerte.service";
import { Component, OnInit } from "@angular/core";
import { User } from "../user";
import { AuthenticationService } from "../authentication.service";
import { Router } from "@angular/router";
import { Role } from "../Role";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-comptes",
  templateUrl: "./comptes.component.html",
  styleUrls: ["./comptes.component.css"],
})
export class ComptesComponent implements OnInit {
  searchText;
  users: any;
  currentUser: User;
  isAdmin: any;
  p: number = 1;
  closeResult: string;
  user = new User();
  user1 = new User();
  modifForm: FormGroup;
  username: any;

  constructor(
    private fb: FormBuilder,
    private authentificationService: AuthenticationService,
    private router: Router,
    private alerteService: AlerteService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.Load();

    this.modifForm = this.fb.group({
      firstname: [""],
      lastname: [""],
      username: [""],
      email: [""],
      password: [""],
      cpassword: [""],
    });
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  deleteUser(username: any) {
    this.authentificationService.delete(username).subscribe(() => this.Load());
  }

  getUser(username: any) {
    this.username = username;
  }

  logout() {
    this.authentificationService.logout();
    this.router.navigate(["/"]);
  }

  Load() {
    this.authentificationService.getAll().subscribe((data) => {
      this.users = data;
    });

    this.currentUser = this.authentificationService.currentUserValue;
    this.isAdmin = localStorage.getItem("role") === Role.Admin;
  }

  onClickSubmit(username: any): void {
    this.authentificationService.getByUsername(username).subscribe((data) => {
      this.user = data;
    });
  }
  modifier(formData) {
    this.user.firstname = formData.firstname;
    this.user.lastname = formData.lastname;
    this.user.username = formData.username;
    this.user.email = formData.email;
    this.authentificationService.modifier(formData.username, this.user);
    setTimeout(() => {
      if (
        this.authentificationService.editResponse.message
          .toString()
          .includes("updated")
      ) {
        this.alerteService.success(
          this.authentificationService.editResponse.message.toString(),
          true
        );
        this.authentificationService.clearEdit();
        setTimeout(() => this.modalService.dismissAll(), 1500);
      } else if (
        this.authentificationService.editResponse.message
          .toString()
          .includes("doesn't")
      ) {
        this.alerteService.error(
          this.authentificationService.editResponse.message.toString(),
          true
        );
      } else {
        this.alerteService.error("Network error", true);
        setTimeout(() => this.modalService.dismissAll(), 1500);
      }
    }, 700);
    this.Load();
  }
}
