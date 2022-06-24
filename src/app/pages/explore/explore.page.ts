import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {

  postDetails: any[]=[];
  noOfRows = 0;

  constructor(private postservice: PostService) { this.getExplorePosts();
  }

  getExplorePosts(){
    this.postservice.getPublicPost().subscribe((res: any)=>{
      console.log(res.data);

      this.postDetails=res.data;
      this.postDetails = this.shuffleArray();
    });
    // this.postDetails=this.shuffleArray();
  }

  isImage(url: string) {
    if(url!==undefined){
      if(url.includes('.mp4')){
        return false;
      }else{
        return true;
      }
    }
  }

  loadThumbnail(url: string){
    return url+'#t=2';
  }

  ngOnInit(): void {
  }
  // showPost(postId: string){

  //   console.log(postId);

  //   this.selected=postId;
  //   // this.postservice.viewPost(postId);
  // }

  checkFormat(url: any,index: number)
  {
    if(!this.isImage(url))
    {
      return 'video-container';
    }
    return 'image-container';
  }

  shuffleArray(){
  return  this.postDetails
  .map(value => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value);
  }

}

