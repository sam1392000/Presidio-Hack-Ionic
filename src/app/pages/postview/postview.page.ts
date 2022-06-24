import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Comments } from 'src/app/core/interfaces/comments';
import { Post } from 'src/app/core/interfaces/post';
import { User } from 'src/app/core/interfaces/user';
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

  @Input() postselected: any;
  select: string[]=[];
  comment: any;
  usercomment: string;
  constructor(private posts: PostlistService,private comments: CommentServiceService,private modalCtrl: ModalController) {
    console.log(this.postselected);
   }

  async back(){
    const post = await this.modalCtrl.create({
      component: TabsPage,
    });
    await post.present();
  }

  ngOnInit() {
    console.log(this.postselected.comments.user);
    // eslint-disable-next-line no-underscore-dangle
    this.comments.getpost(this.postselected._id).subscribe((res: any)=>{this.comment=res.data.comments;
      console.log(res.data.comments);});
    //this.comment = this.postselected.comments;
  }

  likeselect(){
    console.log('Like selected..');
    return this.postselected.likes.length;
  }
  commentCount(){
    return this.postselected.comments.length;
  }
  addComment(){
    const userid: User={
      name: 'Ram',
      userid: '8648279',
      emailid: 'random@gmail.com',
      profilepic: '',
      description: 'Enjoy the way you are!',
      followers: [],
      following: [],
    };
     const cmt: Comments={
      // eslint-disable-next-line no-underscore-dangle
      post: this.postselected._id,
      user: '62aeeed26b0657ec29e03f84',
      comment: this.usercomment,
     };
     this.comment.push(cmt);
     this.comments.uploadComment(cmt).subscribe(res=>{console.log(res);});
    // this.comment = this.comments.commentCount(this.postselected.postUrl);
     this.usercomment='';
  }
  likeselectForComment(comment: Comments){

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


}
