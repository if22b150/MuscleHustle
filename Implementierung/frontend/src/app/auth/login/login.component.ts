import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder,
              private authService: AuthService) {
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

    this.authService.login(
      this.email.value,
      this.password.value
    ).then(
      () => {
      }, (reject: HttpErrorResponse) => {
        // TODO: Error alert
      }
    )

  }

  get email(): AbstractControl {
    return this.loginForm.get('email');
  }
  get password(): AbstractControl {
    return this.loginForm.get('password');
  }
}
