import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from 'src/app/core/services/post.service';


@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.page.html',
  styleUrls: ['./add-post.page.scss'],
})
export class AddPostPage implements OnInit {

  format='';
  url: any='';
  isSelected=false;
  isaccess=false;
  noImagePost=false;
  accessbility='public';
  isuncheked=true;
  comments='';
  selectedFiles: any;
  pepperoni: string;
  inprogress=false;
  constructor(private postservice: PostService) { }

  ngOnInit() {
  }

  showAccessbility(){
    if(this.isaccess===true){
      this.isaccess=false;
    }else{
      this.isaccess=true;
    }
  }
  onChange(event: any) {

    this.selectFile(event);
      const file = event.target.files && event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        if(file.type.indexOf('image')> -1){
          this.format = 'image';
        } else if(file.type.indexOf('video')> -1){
          this.format = 'video';
        }
        // eslint-disable-next-line @typescript-eslint/no-shadow
        reader.onload = (event) => {
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          this.url = (<FileReader>event.target).result;
          this.isSelected=true;
        };
      }else{
        this.isSelected=false;
      }
    }


    selectFile(event: any): void {
      this.selectedFiles = event.target.files[0];
    }

    selectedStatus(){
      if(this.isSelected){
        this.isSelected=false;
        this.url='';
        this.format='';
      }
    }

    changeAccessbility(){
        if(this.accessbility==='public'){
          this.accessbility='private';
        }else{
          this.accessbility='public';
        }
    }


    onClickSubmit(data: NgForm) {
      this.inprogress=true;
      this.noImagePost=true;

      console.log(this.accessbility);

      const formData = new FormData();
      formData.append('description',this.comments);
      formData.append('accessibility',this.accessbility);
      formData.append('post',this.selectedFiles);
      formData.append('user','62aeeed26b0657ec29e03f84');

      // eslint-disable-next-line @typescript-eslint/no-shadow
      this.postservice.uploadPost(formData).subscribe(data=>{
        console.log(data);
        if(data){
          this.url='';
          this.selectedFiles='';
          this.comments='';
          this.accessbility='public';
          this.isSelected=false;
          this.inprogress=false;
          const b = document.getElementById('accessbility');
          b.setAttribute('aria-checked','false');
          b.classList.remove('toggle-checked');
          b.classList.add('toggle-unchecked');

        }
      });
   }
}

