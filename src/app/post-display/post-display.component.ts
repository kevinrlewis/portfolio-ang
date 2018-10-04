import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post-display',
  templateUrl: './post-display.component.html',
  styleUrls: ['./post-display.component.css']
})
export class PostDisplayComponent implements OnInit {

  postsresponse:PostsResponse;
  url = 'http://localhost:8080/api/v1/posts';
  posts:object;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getPosts();
  }

  private getPosts() {
    this.http.get<PostsResponse>(this.url)
      .subscribe(
        (response) => {
          this.posts = response.data;
          console.log(this.posts);
        },
        error => {
          console.log(error);
        }
      );
  }

}

export interface PostsResponse {
  status: number,
  title: string,
  data: object
}