import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RegisterModel } from '../_models/register-model';
import { AccountService } from '../_services/account.service';
import {
  Input,
  Ripple,
  initTE,
} from "tw-elements";
import { AbstractControl, EmailValidator, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

initTE({ Input, Ripple });

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerModel = new RegisterModel();
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined;

  constructor(private accountService: AccountService, private fb: FormBuilder, private router: Router,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    const currentDate = new Date()

    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]],
      number: ['', Validators.required],
      street: ['', Validators.required],
      postalCode: ['', Validators.required],
      city: ['', Validators.required],
      county: ['', Validators.required],
      country: ['', Validators.required],
      dateCreated: [this.getDateOnly(currentDate)],
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : { notMatching: true }
    }
  }

  register() {
    this.accountService.register(this.registerForm.value).subscribe({
      next: response => {
       this.router.navigateByUrl('/home');
        this.cancel();
      },
      error: error => 
      this.validationErrors = error
    });
  }

  private getDateOnly(date: Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }


  cancel() {
    this.cancelRegister.emit(false);
  }

}
