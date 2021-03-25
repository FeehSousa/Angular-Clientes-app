import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../clientes.service';
import { Cliente } from '../cliente'
import { Router, ActivatedRoute } from '@angular/router'


@Component({
  selector: 'app-clientesform',
  templateUrl: './clientesform.component.html',
  styleUrls: ['./clientesform.component.css']
})
export class ClientesformComponent implements OnInit {

  cliente: Cliente = new Cliente;
  success: boolean = false;
  errors: String[] = [];
  id!: number;


  constructor(
    private service: ClientesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {


  }


  ngOnInit(): void {
    let params = this.activatedRoute.params
      .subscribe( params => {
        
        if (params && params['id'] ){
          this.service.getClienteById(params.id)
        .subscribe(
          response => this.cliente = response,
          errorResponse => this.cliente = new Cliente
        )}
      })

      // Arrumar o erro do value 

      /*let params : Observable<Params> = this.activatedRoute.params
      params.subscribe( urlParams => {
        this.id = urlParams['id'];
        if (this.id){
          this.service
          .getClienteById(this.id)
          .subscribe(
            response => this.cliente = response,
            errorResponse => this.cliente = new Cliente
          )
        }
      })*/
      
    
  }

  voltarParaListagem() {
    this.router.navigate(['/clientes/lista'])
  }

  onSubmit() {
    if(this.id){
      this.service
      .atualizar(this.cliente)
      .subscribe(response =>{
        this.success = true
        this.errors = [];
      }, errorsReponse =>{
          this.errors = ['Erro ao atualizar o cliente']
      })

    }else{
    this.service.salvar(this.cliente)
      .subscribe(
        response => {
          this.success = true
          this.errors = [];
          this.cliente = response;
        }, errorResponse => {
          this.errors = errorResponse.error.errors;
          this.success = false;


        }
      )
  
  }}


}
