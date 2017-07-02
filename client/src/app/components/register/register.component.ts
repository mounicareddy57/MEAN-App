import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

form : FormGroup;
messageClass;
message;
processing = false;
emailValid;
emailMessage;
usernameValid;
usernameMessage;

 constructor(private formBuilder: FormBuilder, private authservice: AuthService, private router: Router) { 
  this.createForm();
  }
  
createForm(){
this.form = this.formBuilder.group({
email: ['', Validators.compose([
Validators.required,
Validators.minLength(5),
Validators.maxLength(30),
this.emailValidate
])],
username:['', Validators.compose([
Validators.required,
Validators.minLength(5),
Validators.maxLength(15),
this.usernameValidate
])],
password: ['', Validators.compose([
Validators.required,
Validators.minLength(5),
Validators.maxLength(16),
this.passwordValidate
])],
confirm: ['', Validators.required]
},{ validator: this.matchingPasswords('password','confirm')});
};

emailValidate(controls){
const regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
if(regex.test(controls.value)){
return null;
}else{
return {'emailValidate': true}
}
}

usernameValidate(controls){
 const regex = new RegExp(/^[a-zA-Z\-]+$/);
 if(regex.test(controls.value)){
        return null ;
    }else{
    return {'usernameValidate': true}
    }
}

passwordValidate(controls){
const regex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{5,16}$/);
if(regex.test(controls.value)){
return null;
}else{
return {'passwordValidate': true}
}
}

matchingPasswords(password, confirm){
return(group: FormGroup) =>{
if(group.controls[password].value === group.controls[confirm].value){
return null;
}else{
    return {'matchingPasswords': true}
}}
};

enableForm(){
this.form.controls['email'].enable();
this.form.controls['username'].enable();
this.form.controls['password'].enable();
this.form.controls['confirm'].enable();
};

disableForm(){
this.form.controls['email'].disable();
this.form.controls['username'].disable();
this.form.controls['password'].disable();
this.form.controls['confirm'].disable();
};

onFormSubmit(){
this.disableForm();

//create user object
const user ={
email: this.form.get('email').value, //get the email value from the submitted form
username: this.form.get('username').value,
password: this.form.get('password').value
}

//authenticate and create user
this.authservice.addUser(user).subscribe(data => {
if(!data.success){
this.enableForm();
    this.messageClass = 'alert alert-danger'; //change bootstrap class
    this.message = data.message; //display message from api
    this.processing = true;
}else{
    this.messageClass = 'alert alert-success';
    this.message = data.message;
    setTimeout(()=>{
    this.router.navigate(['/login']);
    },3000)
}
});
};

checkEmail(){
this.authservice.checkEmail(this.form.get('email').value).subscribe(data=>{
if(!data.success){
this.emailValid = false;
this.emailMessage = data.message;
}else{
this.emailValid = true;
this.emailMessage = data.message;
}
});
};

checkUsername(){
this.authservice.checkUsername(this.form.get('username').value).subscribe(data=>{
if(!data.success){
this.usernameValid = false;
this.usernameMessage = data.message;
}else{
this.usernameValid = true;
this.usernameMessage = data.message;
}
});
};


  ngOnInit() {
  }

}
