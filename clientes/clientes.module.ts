import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{ FormsModule } from "@angular/forms"

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesformComponent } from './clientesform/clientesform.component';
import { ClientesListaComponent } from './clientes-lista/clientes-lista.component';


@NgModule({
  declarations: [
    ClientesformComponent,
    ClientesListaComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    FormsModule
  ],
  exports:[
    ClientesformComponent,
    ClientesListaComponent
  ]
})
export class ClientesModule { }
