import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('openClose', [
      state('open', style({
        display: 'block',
        transform: 'translateY(0)',
        maxHeight: '500px',
        opacity: 1
      })),
      state('closed', style({
        display: 'none',
        transform: 'translateY(0)',
        maxHeight: '0px',
        opacity: 0
      })),
      transition('open => closed', [
        animate('200ms ease-in-out')
      ]),
      transition('closed => open', [
        animate('200ms ease-in-out')
      ]),
      // transition('* => closed', [
      //   animate('0.5s')
      // ]),
      // transition('* => open', [
      //   animate('0.5s')
      // ]),
      // transition('open <=> closed', [
      //   animate('0.5s')
      // ]),
      // transition('* => *', [
      //   animate('0.5s')
      // ]),
    ])
  ]
})
export class NavbarComponent implements OnInit {

  isCollapsed = true;

  constructor() { }

  ngOnInit() {
  }

  onResize() {
    this.isCollapsed = true;
  }

}
