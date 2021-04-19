import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { findCol } from '../../shared/Collaborateur/query';
import { Collaborateur } from '../../Models/collaborateur';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: Collaborateur;
  idCol: number =2;

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
