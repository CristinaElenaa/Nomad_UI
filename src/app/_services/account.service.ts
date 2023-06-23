import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModel } from '../_models/user-model';
import { RegisterModel } from '../_models/register-model';
import { LoginModel } from '../_models/login-model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  url = 'Account';
  private currentUserSource = new BehaviorSubject<UserModel | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(loginModel: any) {
    console.log(loginModel);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<UserModel>(`${environment.apiUrl}/${this.url}/${"login"}`, loginModel, { headers })
      .pipe(
        map((response: UserModel) => {
          const userModel = response;
          if (userModel) {
            localStorage.setItem('user', JSON.stringify(userModel));
            this.currentUserSource.next(userModel);
          }
          return userModel;
        }),
        catchError(error => {
          // Handle the error here
          console.error('An error occurred while logging in:', error);
          return throwError(error);
        })
      );
  }

  register(registerModel: any) {
    console.log(registerModel);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<UserModel>(`${environment.apiUrl}/${this.url}/${"register"}`,
      registerModel, { headers })
      .pipe(
        map((user) => {
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUserSource.next(user);
          }
          return user;
        }),
        catchError(error => {
          console.error('An error occurred while logging in:', error);
          return throwError(error);
        })
      );
  }


  setCurrentUser(userModel: UserModel) {
    this.currentUserSource.next(userModel);
  }

  getCurrentUserId(): Observable<UserModel | null> {
    return this.currentUser$.pipe(
      catchError(error => {
        console.error('An error occurred while getting the current user ID:', error);
        return throwError(error);
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }


}
