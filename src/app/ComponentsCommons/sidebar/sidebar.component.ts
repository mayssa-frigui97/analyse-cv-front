import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Collaborateur } from 'src/app/Models/collaborateur';
import { findCol } from 'src/app/shared/Collaborateur/query';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

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
