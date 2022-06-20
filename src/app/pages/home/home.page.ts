import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Comments } from 'src/app/interfaces/comments';
import { CommentServiceService } from 'src/app/services/comment-service.service';
import { PostlistService } from 'src/app/services/postlist.service';
import { Post } from '../../interfaces/post';
import { PostviewPage } from '../postview/postview.page';

enum Visibility{
  private,
  public
};
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {

  postlist: any=[] ;
  select: string[]=[];
  comment: Comments[]=[];
  constructor(private posts: PostlistService,private comments: CommentServiceService,private modalCtrl: ModalController){}

  async showPost(postid: string){
    const post = await this.modalCtrl.create({
      component: PostviewPage,
      componentProps: {postId:postid},
    });
    await post.present();
  }
  ngOnInit(): void{
  //   this.postlist = this.posts.generatePosts().subscribe(data=>{console.log(data);});
  //   //this.postlist.forEach(post=>{console.log(post);});
  //   //this.posts.subjectMessage.subscribe(list => this.postlist=list);
  //   this.select = this.posts.generateLikesList();
  //  // this.posts.likeMessage.subscribe(list=> this.select =list);
  // }
  // likeselect(post: Post){
  //   console.log('Like Clicked');
  //   this.posts.likeCount(post);
  // }
  // commentCount(post: Post){
  //   return this.comments.commentCount(post.postUrl).length;
  }

}
