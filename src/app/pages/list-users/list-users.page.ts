import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.page.html',
  styleUrls: ['./list-users.page.scss'],
})
export class ListUsersPage implements OnInit {
users:any[]=[];
  constructor() { 
    
  }

  ngOnInit() {
    let usersJson = localStorage.getItem('userDb');
    if (usersJson!=null) {
      this.users = JSON.parse(usersJson);
    }
  }

}
