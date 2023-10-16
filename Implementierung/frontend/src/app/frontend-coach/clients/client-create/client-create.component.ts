import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "../../../services/message.service";
import {Router} from "@angular/router";
import {Client} from "../../../models/client.model";
import {ClientService} from "../../../services/client.service";
import {PasswordPdfComponent} from "./password-pdf/password-pdf.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {finalize} from "rxjs";

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.scss']
})
export class ClientCreateComponent implements OnInit{
  clientForm: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  client: Client;
  loading: boolean;

  constructor(private fb: FormBuilder,
              private messageService: MessageService,
              private clientService: ClientService,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
      firstname: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      email: [null, [Validators.required]]
    });
  }

  onSubmit() {
    let password = Math.random().toString(36).slice(-6);
    if(this.clientForm.valid) {
      this.loading = true;

      this.clientService.create(
        this.firstname.value,
        this.lastname.value,
        this.email.value,
        this.gender.value,
        this.phone.value,
        password
      )
        .pipe(finalize(() => this.loading = false))
        .subscribe({
        next: (c) => {
          this.messageService.openSnackBar("KlienIn wurde erstellt.", "Ok");
          let ref = this.dialog.open(PasswordPdfComponent, {
            data: {
              "client": c,
              "password": password
            }
          });

          this.router.navigate(['coach/clients']);
          this.clientService.getAll();
        },
        error: (e) => {
          if(e?.error?.message == "The email has already been taken.")
            this.messageService.openSnackBar("E-Mail Adresse wird bereits verwendet.", "Ok");
        }
      });
    }
  }

  get firstname(): AbstractControl {
    return this.clientForm.get('firstname');
  }
  get lastname(): AbstractControl {
    return this.clientForm.get('lastname');
  }
  get email(): AbstractControl {
    return this.clientForm.get('email');
  }
  get phone(): AbstractControl {
    return this.clientForm.get('phone');
  }
  get gender(): AbstractControl {
    return this.clientForm.get('gender');
  }
}
