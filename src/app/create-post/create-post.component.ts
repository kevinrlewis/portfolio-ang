import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as crypto from 'crypto-js';


declare var require:any;
var keyword = require('./../../../../keyword.json');

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  @Output()
  close:EventEmitter<any> = new EventEmitter();

  @Input()
  userid:number;

  _ref:any;
  createPostForm:FormGroup;
  title:string;
  content:string;
  url = 'http://localhost:8080/api/v1/post';

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  private onSubmit() {
    console.log('text area submitted');
    // console.log('User: ', this.userid);
    // console.log(this.createPostForm.value.postTitle);
    // console.log(this.createPostForm.value.createPostArea);
    console.log('hashed: ');
    var encrypted = crypto.AES.encrypt(keyword.message, keyword.keyword);
    console.log(encrypted.toString());
    this.http.post<PostResponse>(
      this.url,
      {
        "title": this.createPostForm.value.postTitle, "content": this.createPostForm.value.createPostArea, "id": this.userid, "sign": encrypted.toString()
      })
      .subscribe(
        (response) => {
          console.log(response);
          console.log(response.status);
        },
        error => {
          console.log(error);
        }
      );
  }

  private onClose() {
    console.log('closing postForm');
    this.close.emit();
  }

  ngOnInit() {
    this.createPostForm = this.fb.group({
      postTitle: [this.title],
      createPostArea: [this.content]
    });
  }
}

export interface PostResponse {
  status: number,
  title: string
}
