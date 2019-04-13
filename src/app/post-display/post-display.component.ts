import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-post-display',
  templateUrl: './post-display.component.html',
  styleUrls: ['./post-display.component.css']
})
export class PostDisplayComponent implements OnInit {

  postsresponse:PostsResponse;
  url:string;
  posts:Array<Post>;

  constructor(private http: HttpClient) {
    if(environment.production) {
      this.url  = 'https://kevinrlewis.com/api/v1/posts';
    } else {
      this.url  = 'http://localhost:3000/api/v1/posts'
    }
  }

  ngOnInit() {
    this.getPosts();
  }

  private getTime(date: string) {
    let newDate = new Date(date);
    return newDate != null ? newDate.getTime() : 0;
  }

  private getPosts() {
    // console.log(this.url);
    this.http.get<PostsResponse>(this.url)
      .subscribe(
        (response) => {
          console.log(response);
          // if no posts were retrieved
          if (response.status != 200) {
            console.log(response);
            this.posts = JSON.parse('[{ "post": "Error retrieving posts.", "title":">:(" }]');
          } else if (response.status == 200 && response.data == null) {
            this.posts = JSON.parse('[{ "post": "No posts yet.", "title":":(" }]');
          } else {
            this.posts = response.data;
          }
          this.posts.sort((a, b) => {
            return this.getTime(a.createdt) - this.getTime(b.createdt);
          });
        },
        error => {
          // console.log(error);
          this.posts = JSON.parse('[{ "post": "Error retrieving posts.", "title":">:(" }]');
        }
      );
  }

}

export interface PostsResponse {
  status: number,
  title: string,
  data: any
}

export interface Post {
  title: string,
  post: string,
  createdt: string
}
