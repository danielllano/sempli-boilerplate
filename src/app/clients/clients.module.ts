import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ClientsRoutingModule } from '@app/clients/clients-routing.module';
import { ClientsComponent } from '@app/clients/clients.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientComponent } from './client/client.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ClientsRoutingModule
  ],
  declarations: [
    ClientsComponent,
    ClientListComponent,
    ClientComponent
  ]
})
export class ClientsModule { }
