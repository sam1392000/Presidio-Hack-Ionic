import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApicallsService {
  baseURL='http://localhost:5000/api/';
  constructor(private http: HttpClient) { }
  getUserDetails(): any{
    const data='62aeeed26b0657ec29e03f84';
    return this.http.get(`${this.baseURL}profile/${data}`);
  }
  getPost(): any{
    const data ='62aeeed26b0657ec29e03f84';
    return this.http.get(`${this.baseURL}selfposts/${data}`);
  }
  findColleague(name: string): any{
    return this.http.get(`${this.baseURL}/get/user/${name}`);
  }
  followUser(user: any): any{
    return this.http.post(`${this.baseURL}follow/user`,user);
  }
  unfollowUser(user: any): any{
    return this.http.post(`${this.baseURL}unfollow/user`,user);
  }
}
