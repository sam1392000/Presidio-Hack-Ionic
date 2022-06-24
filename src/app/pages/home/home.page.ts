/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { Comments } from 'src/app/core/interfaces/comments';
import { CommentServiceService } from 'src/app/core/services/comment-service.service';
import { PostlistService } from 'src/app/core/services/postlist.service';
import { Post } from '../../core/interfaces/post';
import { PostviewPage } from '../postview/postview.page';
import { VideoPlayer } from '@ionic-native/video-player/ngx';

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

  postlist: any ;
  select: string[]=[];
  comment: Comments[]=[];
  liked: boolean;
  public likecount: number;
  plus: number;
  // eslint-disable-next-line max-len
  constructor(private videoPlayer: VideoPlayer,
     private posts: PostlistService,
     private comments: CommentServiceService,
     private modalCtrl: ModalController){
     // this.likecount ='2';
     }

  async showPost(post: any){
    console.log('parameter to child '+post);
    const postselected = await this.modalCtrl.create({
      component: PostviewPage,
      componentProps: {postselected: post},
    });
    await postselected.present();
  }
  ngOnInit(): void{
   this.posts.generatePosts().subscribe((data: any)=>{this.postlist=data.data;console.log(data.data);});

  }

  likeSelect(post: any){
    console.log('Like selected..'+post._id);
    const data={
      postid:post._id,
      userid:'62aeeed26b0657ec29e03f84'
    };

    if(this.select.includes(post._id)){
      this.select.push(post._id);
    }
    else{
      this.select.splice(this.select.indexOf(post._id),1);
    }
    this.comments.addLike(data).subscribe(res=>{console.log(res);});
  }

  iconChange(el: any){
    const name = 'like+'+el._id;
    const count = '#likecount'+el._id;
    console.log(document.getElementById(name).getAttribute('name'));
    const icon=document.getElementById(name).getAttribute('name');
    if(icon==='heart'){
      document.getElementById(name).setAttribute('name','heart-outline');
      this.likecount=this.likecount-1;
    }
    else{
      document.getElementById(name).setAttribute('name','heart');
      this.likecount=this.likecount+1;
    }
    this.likeSelect(el);
   // el.querySelector('ion-icon').setAttribute('name', 'heart-outline');
  }

  isImage(url: string) {
    if(url!==undefined){
      url=url.toLowerCase();
      // eslint-disable-next-line max-len
      if(url.includes('.jpg')||url.includes('.jpeg')||url.includes('.png')||url.includes('.webp')||url.includes('.avif')||url.includes('.gif')||url.includes('.svg')){
          return true;
      }else{
        return false;
      }
    }
    return false;
  }

  loadThumbnail(url: string){
    return url+'#t=2';
  }
  getLikesCount(post: any){
    console.log("check"+this.select+" "+post.likes.length);
    const count = this.select.includes(post._id)?1:0;
    return post.likes.length+count;
  }


}
