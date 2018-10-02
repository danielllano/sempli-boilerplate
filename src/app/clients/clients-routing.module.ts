import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { ClientsComponent } from '@app/clients/clients.component';
import {ClientComponent} from '@app/clients/client/client.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'clients', component: ClientsComponent, data: { title: extract('Clients') } },
    { path: 'clients/:id', component: ClientComponent, data: { title: extract('Client Details') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ClientsRoutingModule { }
