import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Comments } from 'src/app/core/interfaces/comments';
import { Post } from 'src/app/core/interfaces/post';
import { CommentServiceService } from 'src/app/core/services/comment-service.service';
import { PostlistService } from 'src/app/core/services/postlist.service';
import { HomePage } from '../home/home.page';
import { TabsPage } from '../tabs/tabs.page';

@Component({
  selector: 'app-postview',
  templateUrl: './postview.page.html',
  styleUrls: ['./postview.page.scss'],
})
export class PostviewPage implements OnInit {

  @Input() postId: string;
  post: Post;
  select: string[]=[];
  comment: Comments[]=[];
  usercomment: string;
  constructor(private posts: PostlistService,private comments: CommentServiceService,private modalCtrl: ModalController) {
   // this.post = this.posts.findByPostId(this.postId);
  //  this.post = this.posts.findByPostId(this.postId);
    this.comment = this.comments.commentCount(this.postId);
   }

  async back(){
    const post = await this.modalCtrl.create({
      component: TabsPage,
    });
    await post.present();
  }

  ngOnInit() {
    this.post = this.posts.findByPostId(this.postId);
    this.select = this.posts.generateLikesList();
    this.posts.likeMessage.subscribe(list=> this.select =list);
    this.comment = this.comments.commentCount(this.post.postUrl);
    this.comments.commentMessage.subscribe(comments=>this.comment=comments);
    console.log(this.comment.length);
    this.comment.forEach(e=>{console.log(e);});
  }

  likeselect(post: Post){
    console.log('Like Clicked');
    this.posts.likeCount(post);
  }
  commentCount(post: Post){
    return this.comments.commentCount(post.postUrl).length;
  }
  addComment(){
     const cmt: Comments={
      post: this.post.postUrl,
      user: 'user01',
      comment: this.usercomment,
     };
     this.comments.addComment(cmt);
     this.comment = this.comments.commentCount(this.post.postUrl);
     this.usercomment='';
  }
  likeselectForComment(comment: Comments){

  }

}
