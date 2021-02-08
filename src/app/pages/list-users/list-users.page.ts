import { PostService } from './../../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { promise } from 'protractor';
import { format } from 'path';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.page.html',
  styleUrls: ['./list-users.page.scss'],
})
export class ListUsersPage implements OnInit{
  ngOnInit() {
    this.carregar();
    let usersJson = localStorage.getItem('userDb');
    if (usersJson!=null) {
      this.users = JSON.parse(usersJson);
    }
  }
users:any[]=[];
  constructor(private service:PostService) { 
    
  }

carregar(){
  return new Promise(ret => {
    
 
    let dados = {
      requisicao:'listar'
    };
    this.service.dadosApi(dados,'apiuser.php').subscribe(data => {
      if (data['success']){
        this.users = [];
        for(let user of data['result']){
          this.users.push(user);
        }
        this.atualizaLocalStorage();  
      }
    });
     
  });
  
}

atualizaLocalStorage(){
  console.log(this.users);
  localStorage.setItem('userDb',JSON.stringify(this.users))
 }

}
