import { Component, OnInit } from '@angular/core';
import { Client } from '@app/clients/shared/client.model';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '@app/clients/shared/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  client: Client;
  constructor(private route: ActivatedRoute,
              private clientService: ClientService) { }

  ngOnInit() {
    this.client = this.clientService.getClient(this.route.snapshot.params['id']);
  }

}
