import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

messageClass;
message;
newPost = false;
loadingBlog = false;
form;
processing = false;
username;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private blogService: BlogService) {
  this.createNewBlogForm();
  }

    createNewBlogForm(){
        this.form = this.formBuilder.group({
        title: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(5),
        this.alphaNumericValidation
        ])],
        body: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(500),
        Validators.minLength(5),
        ])]
        });
    }
    
    enableNewBlogForm(){
        this.form.get('title').enable();
        this.form.get('body').enable();
    }
    
    disableNewBlogForm(){
        this.form.get('title').disable();
        this.form.get('body').disable();
    }
    
    alphaNumericValidation(controls){
     const regex = new RegExp(/^[a-zA-Z0-9 ]+$/);
     if(regex.test(controls.value)){
     return null;
     }else{
     return {'alphaNumericValidation':true}
     }
    }

    blogForm(){
    this.newPost = true;
    }
    
    reloadBlog(){
    this.loadingBlog = true;
    //Get all blogs
    setTimeout(()=>{
    this.loadingBlog = false;
    },3000);
    }
    
    postComment(){
    console.log("comment posted");
    }
    
    onBlogSubmit(){
    //console.log('form submitted');
    this.processing = true;
    this.disableNewBlogForm();
    
    //create a blog object
    const blog = {
    title: this.form.get('title').value,
    body: this.form.get('body').value,
    createdBy: this.username
    }
    //console.log(blog);
    this.blogService.newBlog(blog).subscribe(data=>{
    if(!data.success){
    this.messageClass='alert alert-danger';
    this.message = data.message;
    this.processing = false;
    this.enableNewBlogForm();
    }else{
    this.messageClass='alert alert-success';
    this.message = data.message;
    setTimeout(()=>{
    this.newPost = false;
    this.processing = false;
    this.message = false;
    this.form.reset();
    this.enableNewBlogForm();
    },2000);
    }
    })
    
    }
    
    back(){
    window.location.reload();
    }

  ngOnInit() {
  this.authService.getProfile().subscribe(profile=>{
  this.username = profile.user.username;
  });
  }

}
