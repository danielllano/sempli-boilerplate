import { Injectable } from '@angular/core';
import { Client } from '@app/clients/shared/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private clients: Client[] = [
    // tslint:disable-next-line:max-line-length
    new Client(88, 900995954, 'Mock Company SAS', 'abc123', 'Activa', 'SAS', {}, {}, 3)
  ];

  constructor() { }

  getClients() {
    return this.clients.slice();
  }

  getClient(id: number) {
    return this.clients[id];
  }
}
