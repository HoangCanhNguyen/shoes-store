import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit {
  loginForm: FormGroup;
  signupForm: FormGroup;
  constructor(private location: Location, private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
    this.signupForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onLogin() {
    console.log();
    
    this.authService.SignIn(
      this.loginForm.value['email'],
      this.loginForm.value['password']
    );
  }
  onSignup() {
    this.authService.SignUp(
      this.signupForm.value['email'],
      this.signupForm.value['password']
    );
  }
  onGoBack() {
    this.location.back();
  }
  toggleForm(): void {
    const formWrapper = document.querySelector('.form-box');
    formWrapper.classList.toggle('active');
  }

  activateSubmenu(): void {
    document.querySelector('.sub-menu').classList.toggle('active');
  }
}
