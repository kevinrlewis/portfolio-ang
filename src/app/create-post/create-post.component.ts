import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  @Input()
  userid:number;

  createPostForm:FormGroup;
  title:string;
  content:string;
  url = 'http://localhost:8080/api/v1/post';

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  private onSubmit() {
    console.log('text area submitted');
    console.log('User: ', this.userid);
    console.log(this.createPostForm.value.postTitle);
    console.log(this.createPostForm.value.createPostArea);
    this.http.post<PostResponse>(
      this.url,
      {
        "title": this.createPostForm.value.postTitle, "content": this.createPostForm.value.createPostArea, "id": this.userid
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
