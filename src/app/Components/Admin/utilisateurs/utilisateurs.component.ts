import { Collaborateur } from './../../../Models/collaborateur';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { findCols } from '../../../shared/Collaborateur/query';
import { map } from 'rxjs/operators';
import { UserRole } from 'src/app/Enums/UserRole';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateursComponent implements OnInit {

  users: Observable<Collaborateur[]>;
  roles=[
    {id: 1, role: UserRole.COLABORATEUR},
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

}
