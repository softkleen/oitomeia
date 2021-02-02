import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.page.html',
  styleUrls: ['./tarefas.page.scss'],
})
export class TarefasPage implements OnInit {
tarefas:any[]=[];
//  {nome:"Estudar Ionic Senac",feito:true},
//  {nome:"Preparar ambiente",feito:true},
//  {nome:"Senac Itaquera",feito:false}, 
//  {nome:"Esquecer Xamarin",feito:true},  
//];
  constructor(private alertCtrl: AlertController) { }

  ngOnInit() {
  }

 async addTarefa(){
    const alerta = await this.alertCtrl.create({
      header:"O que precisa fazer?",
      inputs:[
        {name:'txtnome', type:'text', placeholder:'digite nome...'},
        {name:'txtcpf', type:'text', placeholder:'digite cpf...'},
      ],
      buttons: [
        {text:'Cancelar', role:'cancel', cssClass:'ligth',
        handler:()=>{
          // caso o usuário clique em cancelar
          console.log("O usuário cancelou!!!");
        }},
        {
          text:'Ok',handler:(form)=>{
            // debugger
            console.log(form);
          }
        }
      ]
    });
    alerta.present();
  }

}
