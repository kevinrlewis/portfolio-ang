import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post-display',
  templateUrl: './post-display.component.html',
  styleUrls: ['./post-display.component.css']
})
export class PostDisplayComponent implements OnInit {

  postsresponse:PostsResponse;
  url = 'https://portfolio.kevinrlewis.com/api/v1/posts';
  posts:object;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getPosts();
  }

  private getPosts() {
    this.http.get<PostsResponse>(this.url)
      .subscribe(
        (response) => {
          //console.log(response);
          // if no posts were retrieved
          if (response.status != 200) {
            this.posts = JSON.parse('[{ "post": "Error retrieving posts.", "title":">:(" }]');
          } else if (response.status == 200 && response.data == null) {
            this.posts = JSON.parse('[{ "post": "No posts yet.", "title":":(" }]');
          } else {
            this.posts = response.data;
          }
          //console.log(this.posts);
        },
        error => {
          //console.log(error);
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
