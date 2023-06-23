import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private url = "User";

  constructor(private http: HttpClient) { }

  uploadPhoto(file: File, userId: number | undefined): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    let params = new HttpParams();
    if (userId) {
      params = params.set('userId', userId.toString());
    }

    return this.http.post<string>(`${environment.apiUrl}/${this.url}/${"add-photo"}`, formData, { params });
  }
}
