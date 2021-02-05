import { BuscacepService } from './../../buscacep.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cep',
  templateUrl: './cep.page.html',
  styleUrls: ['./cep.page.scss'],
})
export class CepPage {
cep:string;
resultado:any={
  cep:'',
  logradouro:'',
  bairro:'',
  tipo_logradouro:''
};
  constructor(private buscador:BuscacepService) { }

  consultarCep(){
  this.buscador.obterEndereco(this.cep)
  .then((json)=>{
    this.resultado = json;
  })
  .catch();
  }

  
}
