import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Comments } from '../interfaces/comments';

@Injectable({
  providedIn: 'root'
})
export class CommentServiceService {
  commentList: Comments[]=[];
  constructor() {

  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  private subjectSource = new Subject<Comments[]>();
  // eslint-disable-next-line @typescript-eslint/member-ordering
  commentMessage = this.subjectSource.asObservable();

  updateSubject(comments: Comments[]){
    this.subjectSource.next(this.commentList);
  }

  addComment(comment: Comments){
    this.commentList.push(comment);
    this.updateSubject(this.commentList);
    console.log(this.commentList.toString+' '+this.commentList.length);
  }
  generateComments(postId: string): Comments[]{
    console.log('In genertae post..'+this.commentList.length);
    return this.commentCount(postId);
  }
  commentCount(postId: string): Comments[]{
    const count = 0;
    // eslint-disable-next-line prefer-const
    let commentLists =[];
    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    this.commentList.forEach(function(p){
       if(p.post===postId){
        commentLists.push(p);
       }
    });
    //commentLists.forEach(e=>{console.log(e);});
     return commentLists;
  }

}
