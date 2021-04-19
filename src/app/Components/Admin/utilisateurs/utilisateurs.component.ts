import { Collaborateur } from './../../../Models/collaborateur';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { findCols, findFilterColsRole } from '../../../shared/Collaborateur/query';
import { map } from 'rxjs/operators';
import { UserRole } from 'src/app/Enums/UserRole';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateursComponent implements OnInit {

  users: Collaborateur[];
  roles=[
    {id: 1, role: UserRole.COLLABORATEUR},
    {id: 2, role: UserRole.RH},
    {id: 3, role: UserRole.RP},
    {id: 4, role: UserRole.TEAMLEADER},
    {id: 5, role: UserRole.ADMIN}
  ];
  selected = [];

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.apollo.watchQuery<any>({
      query: findCols,
    })
      .valueChanges
      .pipe(
        map(result => result.data.findCols)
      ).subscribe(data => {
      this.users = data;
    });
    console.log("cols :",this.users);
  }

  getFilterCols(selectedRoles: UserRole[]) {
    this.apollo
      .query<any>({
        query: findFilterColsRole,
        variables: { selectedRoles }
      })
      .subscribe(({ data }) => {
        this.users = [];
        this.users = data.findFilterColsRole;
        console.log('colsFilter:', this.users);
      });
  }

}
