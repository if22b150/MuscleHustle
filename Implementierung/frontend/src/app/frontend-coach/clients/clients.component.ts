import {Component, OnInit, ViewChild} from '@angular/core';
import {Client} from "../../models/client.model";
import {MessageService} from "../../services/message.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {ClientService} from "../../services/client.service";
import {filter} from "rxjs";
import {genderTypeCast} from "../../models/enum/gendertype.model";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit{
  displayedColumns: string[] = ['firstname', 'lastname', 'gender', 'phoneNumber', 'email', 'edit', 'delete'];
  clients: Client[];
  dataSource;

  constructor(private messageService: MessageService,
              private clientService: ClientService) {
    }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.clientService.clients$
      .pipe(filter(c => c != null))
      .subscribe({
        next: (c) => {
          this.clients = c;
          this.dataSource = new MatTableDataSource(c);
          this.dataSource.sort = this.sort;
        }
      })
  }

  edit(id: number) {
    this.messageService.openSnackBar('Klient ' + id + ' kann leider noch nicht editiert werden', 'Ok');
  }

  delete(user: Client): void {
    this.clientService.delete(user.id).subscribe(
      () => {
        this.messageService.openSnackBar( user.firstname + ' ' + user.lastname + ' wurde gelöscht', 'Ok');
        this.clientService.getAll();
      },
      (error) => {
        this.messageService.openSnackBar(user.firstname + ' ' + user.lastname + ' konnte nicht gelöscht werden', 'Ok');
      }
    );
  }

  protected readonly genderTypeCast = genderTypeCast;
}
