import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { ClientesListaComponent } from './clientes-lista/clientes-lista.component';
import { ClientesformComponent } from './clientesform/clientesform.component';
import { AuthGuard } from '../auth.guard'

const routes: Routes = [
  {path : 'clientes' , component: LayoutComponent, canActivate:[AuthGuard] ,children:[
    
    { path:'form', component: ClientesformComponent},
    { path:'form/:id', component: ClientesformComponent},
    { path: 'lista', component: ClientesListaComponent},
    { path: '', redirectTo: '/clientes/lista', pathMatch:'full'}
  ]}
 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
