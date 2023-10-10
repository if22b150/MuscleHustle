import {Component, ViewChild} from '@angular/core';
import {Client} from "../../models/client.model";
import {MessageService} from "../../services/message.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {ClientService} from "../../services/client.service";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent {
  displayedColumns: string[] = ['firstname', 'lastname', 'gender', 'phoneNumber', 'email', 'edit', 'delete'];
  clients: Client;
  dataSource;

  constructor(private messageService: MessageService,
              private clientService: ClientService) {
    this.clientService.clients$.subscribe((clients: any) => {
      if (clients != null) {
        this.clients = clients;
        this.dataSource = new MatTableDataSource(clients);
        this.dataSource.sort = this.sort;
      }
    });
  }

  @ViewChild(MatSort) sort: MatSort;

  edit(id: number) {
    this.messageService.openSnackBar('Klient ' + id + ' kann leider noch nicht editiert werden', 'Ok');
  }

  delete(id: number) {
    this.messageService.openSnackBar('Klient ' + id + ' kann leider noch nicht gelöscht werden', 'Ok');
  }
}
