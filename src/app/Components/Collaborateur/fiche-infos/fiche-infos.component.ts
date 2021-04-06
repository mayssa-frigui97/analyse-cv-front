import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Collaborateur } from 'src/app/Models/collaborateur';
import { findCol } from 'src/app/shared/Collaborateur/query';

@Component({
  selector: 'app-fiche-infos',
  templateUrl: './fiche-infos.component.html',
  styleUrls: ['./fiche-infos.component.css']
})
export class FicheInfosComponent implements OnInit {

  user: Collaborateur;
  idCol: number =1;

  constructor(private apollo : Apollo) { }

  ngOnInit(): void {
    this.getCol(this.idCol);
  }

  getCol(idCol: number) {
    this.apollo.query<any>({
      query: findCol,
      variables: {idCol}
    }).subscribe(({data}) => {
      this.user = data.findCol;
      console.log('user :', this.user);
    });
  }

}
