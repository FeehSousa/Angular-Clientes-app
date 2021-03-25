import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../clientes.service';
import { Cliente } from '../cliente';
import {Router} from '@angular/router'

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit {

  clientes: Cliente[] = [];
  clienteSelecionado = new Cliente ();
  mensagemSucesso! : string ;
  mensagemErro! : string ; 
  
   mdlSampleIsOpen : boolean = false;
   openModal(open : boolean) : void {
    this.mdlSampleIsOpen = open;
  }
  
  constructor(
    private service: ClientesService, 
    private router: Router) { }

  ngOnInit(): void {
    //Teste para ver se funciona a lista
    /*this.clientes = this.service.getClientes();*/

    this.service
      . getClientes()
      .subscribe( resposta => this.clientes = resposta) 
  }
  novoCadastro(){
    this.router.navigate(['/clientes/form'])
  }

  preparaDelecao(cliente : Cliente){
    this.clienteSelecionado = cliente;
    
    
  }
  deletarCliente(){
    this.service
    .deletar(this.clienteSelecionado)
    .subscribe(reponse =>{
      this.mensagemSucesso = "Cliente deletado com sucesso!",
      this.ngOnInit();
      
    }, erro => {
      this.mensagemErro = "Erro ao deletar o cliente."
    })
  }

}
