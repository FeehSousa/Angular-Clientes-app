import { Injectable } from '@angular/core';
import { Cliente } from './clientes/cliente';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  apiURL : string = environment.apiURLBase + '/api/clientes';

  constructor(private http : HttpClient) { 
    
  }

  salvar(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(`${this.apiURL}`, cliente)
  }
  atualizar(cliente: Cliente): Observable<any>{
    return this.http.put<Cliente>(`${this.apiURL}/${cliente.id}`, cliente)
  }

  getClientes(): Observable<Cliente[]> {
    // pegando token

    /*/const tokenString = localStorage.getItem('access_token')
    const token = JSON.parse(tokenString)
    const headers = {
      'Authorization' : 'Bearer ' + token.access_token
    }*/
    return this.http.get<Cliente[]>(this.apiURL);
  }
  getClienteById(id: number): Observable<Cliente>{
    return this.http.get<any>(`${this.apiURL}/${id}`)

  }
  deletar(cliente: Cliente): Observable<any>{
    return this.http.delete<any>(`${this.apiURL}/${cliente.id}`)
  }

  //Teste para ver se funciona a lista
 /* getClientes(): Cliente[]{
    let cliente= new Cliente();
    cliente.id = 1;
    cliente.nome ="Fernando";
    cliente.cpf = "12345678910";
    cliente.dataCadastro = "08/03/2021"
    return [cliente];

  }*/
}
