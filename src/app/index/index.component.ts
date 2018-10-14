import { Component, OnInit, HostBinding } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { User } from '../user';
import { CreatePostComponent } from '../create-post/create-post.component';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  animations: [
    trigger('openClose', [
      state('open', style({})),
      state('closed', style({})),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ])
    ])
  ]
})
export class IndexComponent implements OnInit {
  postForm:FormGroup;
  username:string;
  password:string;
  authresponse: AuthResponse;
  userid:number;

  closeResult: string;
  user = new User('', '');
  url:string;
  auth_success = false;

  constructor(private modalService: NgbModal, private fb: FormBuilder, private http: HttpClient) {
    if(environment.production) {
      this.url  = 'https://kevinrlewis.com/api/v1/auth';
    } else {
      this.url  = 'http://localhost:8080/api/v1/auth'
    }
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', windowClass: 'mod-modal-window'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return 'with: ${reason}';
    }
  }

  private onSubmit() {
    //console.log('form was submitted!');
    this.http.post<AuthResponse>(
      this.url,
      {
        "username": this.postForm.value.username, "password": this.postForm.value.password
      })
      .subscribe(
        (response) => {
          //console.log(response);
          //console.log(response.status);
          // authentication failed
          if(response.status != 200) {
            this.auth_success = false;
          }
          // authentication was successful
          else if(response.status == 200) {
            this.auth_success = true;
            this.userid = response.id;
          }
          // for some other odd reason
          else {
            this.auth_success = false;
          }
        },
        error => {
          //console.log(error);
          this.auth_success = false;
        }
      );
  }

  private close() {
    this.auth_success = false;
  }

  ngOnInit() {
    this.postForm = this.fb.group({
      username: [this.username],
      password: [this.password]
    });
  }
}

export interface AuthResponse {
  status: number,
  title: string,
  id: number
}
