import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  createPostForm:FormGroup;
  content:string;

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  private onSubmit() {
    console.log('text area submitted');
    console.log(this.createPostForm.value.createPostArea);
  }

  ngOnInit() {
    this.createPostForm = this.fb.group({
      createPostArea: [this.content]
    });
  }

}
