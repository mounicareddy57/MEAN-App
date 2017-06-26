import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

form : FormGroup;

 constructor(private formBuilder: FormBuilder) { 
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
}

onFormSubmit(){
console.log("Form submitted");
};

  ngOnInit() {
  }

}
