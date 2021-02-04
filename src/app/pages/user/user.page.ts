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
users:any[]=[];

  constructor(private route: Router, private toastCtrl: ToastController) { 
  }

  ngOnInit() {
  }
 async salvar(){

   let user = {nome:this.nome,email:this.email,senha:this.senha};
   this.users.push(user);
   this.atualizaLocalStorage();
   this.route.navigate(['list-users']);
   this.nome='';
   this.email='';
   this.senha='';

   const toast = await this.toastCtrl.create({
     message:"Usuário gravado com sucesso",
     duration:2000,
     color:"success"
   });
   toast.present();

   console.log(this.users);
 }
 cancelar(){
   
 }

 atualizaLocalStorage(){
  localStorage.setItem('userDb',JSON.stringify(this.users))
 }

}
