import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Comments } from '../interfaces/comments';
import {  Post } from '../interfaces/post';
enum Visibility{
  private,
  public
};
@Injectable({
  providedIn: 'root'
})

export class PostlistService {
  constructor( private http: HttpClient) {
  }
  generatePosts(){
    //console.log('In genertae post..'+this.post.length);
    return this.http.get('http://localhost:5000/api/home/62aee4e2f6dd4af8ea2fdbbf');
  }
}
