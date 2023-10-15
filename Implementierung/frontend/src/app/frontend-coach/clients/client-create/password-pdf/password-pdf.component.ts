import {Component, Inject, OnInit} from '@angular/core';
import {Client} from "../../../../models/client.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-password-pdf',
  templateUrl: './password-pdf.component.html',
  styleUrls: ['./password-pdf.component.scss']
})
export class PasswordPdfComponent implements OnInit{
  client: Client;
  password: string;

  constructor(private dialogRef: MatDialogRef<PasswordPdfComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.client = data.client;
    this.password = data.password;
  }

  ngOnInit(): void {
  }

  cancel() {
    this.dialogRef.close();
  }

  download() {
    if (this.password) {
      var documentDefinition = {
        content: [
          {
            table: {
              headerRows: 1,
              body: [
                [
                  { text: 'Vorname', bold: true },
                  { text: 'Nachname', bold: true },
                  { text: 'E-Mail', bold: true },
                  { text: 'Passwort', bold: true }
                ],
                [
                  this.client.firstname,
                  this.client.lastname,
                  this.client.email,
                  this.password,
                ]
              ]
            }
          }]
      };
    } else {
      var documentDefinition = {
        content: [
          {
            table: {
              headerRows: 1,
              body: [
                [
                  { text: 'Vorname', bold: true },
                  { text: 'Nachname', bold: true },
                  { text: 'E-Mail', bold: true },
                  { text: 'Passwort', bold: true }
                ],
                [
                  this.client.firstname,
                  this.client.lastname,
                  this.client.email,
                  this.password
                ]
              ]
            }
          }]
      };
    }
    pdfMake.createPdf(documentDefinition).download(`${this.client.firstname}_${this.client.lastname}_Zugangsdaten`);
  }

}
