import { Component, OnInit } from '@angular/core';
import { Client } from '@app/clients/shared/client.model';
import { ClientService } from '@app/clients/shared/client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
  clients: Client[];

  constructor(private clientService: ClientService) {
  }

  ngOnInit() {
    this.clients = this.clientService.getClients();
  }

}
