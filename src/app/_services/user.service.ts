import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModel } from '../_models/user-model';
import { UpdateUserModel } from '../_models/update-user-model';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "User";
  private currentUserSource = new BehaviorSubject<UserModel | null>(null);
  currentUser$ =  this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  public getUserById(id: number): Observable<UserModel> {
    let params = new HttpParams();
    params = params.append('id', id);
    
    return this.http.get<UserModel>(`${environment.apiUrl}/${this.url}/${"id"}`, {
      params: params});
  }


  public updateUser(user: UpdateUserModel | null, id: number | null) {
    if(user && id)
    {
      user.id = id;
    }
    return this.http.put(`${environment.apiUrl}/${this.url}`, user);
  }
}
