import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BuscacepService {
  // pesquise verbos http

  constructor(private http:HttpClient) { }

obterEndereco(cep: string){
//let url = "http://cep.republicavirtual.com.br/web_cep.php?cep="+cep+"&formato=json";
let url = "https://viacep.com.br/ws/"+cep+"/json";
return this.http.get(url).toPromise();
}

}
