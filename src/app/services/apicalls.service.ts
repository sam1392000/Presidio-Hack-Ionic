import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApicallsService {
  constructor(private http: HttpClient) { }
  getUserDetails(): any{
    return this.http.get('http://localhost:5000/api/profile/62aeeed26b0657ec29e03f84');
  }
  getPost(): any{
    return this.http.get('http://localhost:5000/api/getmypost/62aeeed26b0657ec29e03f84');
  }
}
