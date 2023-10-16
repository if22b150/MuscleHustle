import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  submitted: boolean = false;
  loading: boolean;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    })
  }

  onSubmit() {
    this.submitted = true;

    if(this.loginForm.invalid)
      return;

    this.loading = true;

    this.authService.login(
      this.email.value,
      this.password.value
    ).then(
      () => {
      }, (reject: HttpErrorResponse) => {
        console.log(reject.message)
        // TODO: Error alert
        if(reject.error[0] == "User not found.")
          this.messageService.openSnackBar('Es existiert kein Account mit dieser E-Mail Adresse.', "Ok");
        else if(reject.error[0] == "Credentials incorrect")
          this.messageService.openSnackBar('E-Mail Adresse und Passwort stimmen nicht überein.', "Ok");
        else
          this.messageService.openSnackBar('Login fehlgeschlagen. Überprüfen Sie Ihre Eingaben.', "Ok");
      }
    ).finally(
      () => this.loading = false
    )

  }

  get email(): AbstractControl {
    return this.loginForm.get('email');
  }
  get password(): AbstractControl {
    return this.loginForm.get('password');
  }
}
