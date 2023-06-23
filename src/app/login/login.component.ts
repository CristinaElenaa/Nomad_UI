import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { LoginModel } from '../_models/login-model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLogged = false;
  loginForm: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined;

  constructor(private accountService: AccountService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
    })
  }


  login(){
    this.accountService.login(this.loginForm.value).subscribe({
      next: response => {
        this.isLogged = true;
        this.router.navigate(['/home']);
      },
       error: error => 
       this.validationErrors = error
    })
  }

  logout(){
    this.accountService.logout();
    this.isLogged = false;
  }
}
