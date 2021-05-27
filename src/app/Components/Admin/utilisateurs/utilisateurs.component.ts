import { Collaborateur } from './../../../Models/collaborateur';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { findCols, findFilterColsRole, removeCol } from '../../../shared/Collaborateur/query';
import { map } from 'rxjs/operators';
import { UserRole } from 'src/app/Enums/UserRole';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateursComponent implements OnInit {

  users: Collaborateur[];
  public myUser: Collaborateur;
  roles=[
    {id: 1, role: UserRole.COLLABORATEUR},
    {id: 2, role: UserRole.RH},
    {id: 3, role: UserRole.RP},
    {id: 4, role: UserRole.TEAMLEADER}
  ];
  selected = [];

  constructor(private apollo: Apollo,
    private router: Router,
    private toastr: ToastrService) { }

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
      console.log("cols :",this.users);
    });
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

  deleteUser(idCol: number) {
    console.log("myUser:",this.myUser);
    this.users = this.users.filter(col => col.id !== idCol);
    // const deletedUser = this.candidats.filter(candidat => candidat.id === idCand)[0];
    // if (confirm('Are you sure to delete this user?')) {
    this.apollo.mutate({
      mutation: removeCol,
      variables: {idCol}
    }).subscribe(res => {
      this.toastr.success('Good', 'Utilisateurs supprimé');
      this.router.navigate(['utilisateurs']);
      // this.rerender({newData: deletedUser, deleteOper: true});

    }, error => {
      this.toastr.error("suppression impossible!!", 'Error');
      console.log("suppression impossible!!")
    });
    // }
  }

}
