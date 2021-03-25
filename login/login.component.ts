import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {Usuario} from './usuario'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  username!: string;
  password!: string;
  mensagemsucesso!: string;
  cadastrando!: boolean;
  errors: String[] = [];

  constructor(
    private router: Router,
    private authService: AuthService
    ) { }

  onSubmit(){
    this.authService                                                                                                                 
        .tentarLogar(this.username, this.password)
        .subscribe ( response =>{
          const access_token = JSON.stringify(response);
          localStorage.setItem('access_token', access_token)
          console.log(response)
          this.router.navigate(['/home'])
          
        }, erroResponse => {
          this.errors = ['Usuário ou senha incorretos']
          this.mensagemsucesso = "";
         })
         
  }
  preparaCadastrar(event: { preventDefault: () => void; }){
    event.preventDefault();
    this.cadastrando = true;

  }
  cancelaCadastro(){
    this.cadastrando = false;
  }
  cadastrar(){
    const usuario : Usuario = new Usuario;
    usuario.username = this.username;
    usuario.password = this.password;
    this.authService
      .salvar(usuario)
      .subscribe(respense =>{
        this.mensagemsucesso = "Usuário cadastrado com sucesso! Efetue o Login.";
        this.cadastrando = false;
        this.username = "";
        this.password = "";
        this.errors = [];
      }, errorResponse => {
        this.errors = errorResponse.error.errors;
        this.mensagemsucesso = "";
      }
      )

  }

}
