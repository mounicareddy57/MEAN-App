import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class BlogService {

options;
domain = this.authService.domain;

  constructor(private authService: AuthService, private http:Http) { }
  
   //create authentication headers, add token to be used in http requests
  createAuthenticationHeaders(){
  this.authService.loadToken(); // get token to be attached to the headers
  //Headers configuration options
  this.options= new RequestOptions({
  headers: new Headers({
  'Content-type': 'application/json',
  'authorization': this.authService.authToken
  })
  });
  };
  
  newBlog(blog){
  this.createAuthenticationHeaders();
  return this.http.post(this.domain +'/blogs/newBlog', blog, this.options).map(res=>res.json());
  }
  
  
}
