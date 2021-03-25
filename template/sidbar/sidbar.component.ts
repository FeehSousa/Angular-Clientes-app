import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-sidbar',
  templateUrl: './sidbar.component.html',
  styleUrls: ['./sidbar.component.css']
})
export class SidbarComponent implements OnInit {

  usuarioLogado! :string
  constructor(
    private authService : AuthService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.usuarioLogado = this.authService.getUsuarioAutenticado();
  }
  logout(){
    this.authService.encerrarSessao();
    this.router.navigate(['/login'])
  }

}
