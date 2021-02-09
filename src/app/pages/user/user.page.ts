import { promise } from 'protractor';
import { PostService } from './../../../services/post.service';
import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
nome:string;
email:string;
senha:string;
nivel:string;
users:any[]=[];

  constructor(
    private route: Router, 
    private toastCtrl: ToastController,
    private service:PostService
    ) { 
    let usersJson = localStorage.getItem('userDb');
    //console.log(tarefasJson);
    if (usersJson!=null) {
      this.users = JSON.parse(usersJson);
    }
  }

  ngOnInit() {
  }
 async salvar(){
   //let user = {nome:this.nome,email:this.email,senha:this.senha};
   //this.users.push(user);
    return new Promise(res => {
      let dados = {
        requisicao:"add",
        nome:this.nome,
        email:this.email,
        senha:this.senha,
        nivel: this.nivel
      };
      this.service.dadosApi(dados,'apiuser.php').subscribe(async data => {
        if(data['success']){
          //debugger;
          const toast = await this.toastCtrl.create({
            message:"Usuário gravado com sucesso",
            duration:2000,
            color:"success"
          });
          await toast.present();
          this.route.navigate(['list-users']);
          this.nome='';
          this.email='';
          this.senha='';
          this.nivel = '';
        }else{
          const toast1 = await this.toastCtrl.create({
            message:data['msg'],
            duration:2000,
            color:"warning"
          });
          await toast1.present();
        }
      });
    });   
 } // final do método salvar
 cancelar(){
   
 }

 atualizaLocalStorage(){
  localStorage.setItem('userDb',JSON.stringify(this.users))
 }

}
