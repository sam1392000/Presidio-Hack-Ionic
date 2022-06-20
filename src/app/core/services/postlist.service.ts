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
  post: Post[]=[];
  select: string[]=[];
  constructor( private http: HttpClient) {
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  private subjectSource = new Subject<Post[]>();
  // eslint-disable-next-line @typescript-eslint/member-ordering
  subjectMessage = this.subjectSource.asObservable();

  // eslint-disable-next-line @typescript-eslint/member-ordering
  private likeSource = new Subject<string[]>();
  // eslint-disable-next-line @typescript-eslint/member-ordering
  likeMessage = this.likeSource.asObservable();

  updateSubject(posts: Post[]){
    this.subjectSource.next(this.post);
  }

  updateLikeSubject(like: string[]){
    this.likeSource.next(this.select);
  }

  addPost(post: Post){
    this.post.push(post);
    this.updateSubject(this.post);
    console.log(this.post.toString+' '+this.post.length);
  }

  addLike(post: Post){
    this.select.push(post.postUrl);
    this.updateLikeSubject(this.select);
    console.log(this.select.toString+' '+this.select.length);
  }

  generatePosts(){
    console.log('In genertae post..'+this.post.length);
    return this.http.get('http://localhost:5000/api/home/62aeeed26b0657ec29e03f84');
  }

  generateLikesList(): string[]{
    console.log('In genertae post..'+this.select.length);
    return this.select;
  }

  likeCount(post: Post){
    if(this.select.includes(post.postUrl)){
      const index = this.post.indexOf(post);
      //console.log("In Service likecount.."+index);
     // this.post[index].likescount--;
      this.select.splice(this.select.indexOf(post.postUrl),1);
     // console.log(this.post[index].likescount);
      this.updateLikeSubject(this.select);
    }
    else{
      const index = this.post.indexOf(post);
      //console.log("In Service likecount.."+index);
      //this.post[index].likescount++;
      this.addLike(post);
     // console.log(this.post[index].likescount);
    }
  }
  // deleteState(index){
  //   this.post.splice(index, 1);
  //   this.updateSubject(this.post);
  // }
  findByPostId(postid: string): Post{
    let post: Post={
      postUrl: '',
      user: '',
      comments: [],
      description: '',
      likes: [],
      accessibility: Visibility.private
    };
    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    this.post.forEach(function(p){
      if(p.postUrl === postid){
       // console.log('postid : '+p.postid);
        post=p;
        // return post;
      }
    });
    return post;
  }
}
