import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, ActionSheetController } from '@ionic/angular';

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
  constructor(private alertCtrl: AlertController,
              private toastCrtl: ToastController,
              private action:ActionSheetController
              ) { 
                //buscando os dados ao carregar a página
                let tarefasJson = localStorage.getItem('tarefaDb');
                //console.log(tarefasJson);
                if (tarefasJson!=null) {
                  this.tarefas = JSON.parse(tarefasJson);
                }
              }

  ngOnInit() {
  }

 async addTarefa(){
    const alerta = await this.alertCtrl.create({
      header:"O que precisa fazer?",
      inputs:[
        {name:'txtnome', type:'text', placeholder:'digite nome...'},
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
            //console.log(form);
            this.add(form.txtnome);
          }
        }
      ]
    });
    alerta.present();
  }// termina o metodo addTarefa()

 async add(nova:any){
  if(nova.trim().length < 1){
    const toast = await this.toastCrtl.create({
      message: "Informe a tarefa que deseja registrar",
      duration:2000,
      position:"middle",
      color:"warning"
    });
    toast.present();
    return;
  }
  let tarefa = {nome:nova,feito:false};
  this.tarefas.push(tarefa);
  // armazenar no celular
  this.atualizaLocalStorage();
  } // fim do metodo add

  atualizaLocalStorage(){
    localStorage.setItem('tarefaDb',JSON.stringify(this.tarefas))
  }
  excluir(tarefa:any ){
    this.tarefas = this.tarefas.filter(a => tarefa !=a);
    this.atualizaLocalStorage();
  }

  async abrirOpcoes(tarefa:any){
    const actSheet = await this.action.create({
      header: "Escolha uma ação",
      buttons:[{
        text:tarefa.feito?'Desmacar':'Marcar',
        icon:tarefa.feito?'radio-button-off':'checkmark-circle',
        handler:()=>{
          tarefa.feito=!tarefa.feito;
          this.atualizaLocalStorage();
        }
      },{
        text:'Cancelar',
        icon:'Close',
        role: 'cancel',
        handler:()=>{
          // código para cancelar...
        }

      }]
    });
    await actSheet.present();

  }
}
