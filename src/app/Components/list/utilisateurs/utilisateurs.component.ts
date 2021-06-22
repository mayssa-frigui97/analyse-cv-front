import { Collaborateur } from '../../../Models/collaborateur';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { findCols, findFilterUsers, findRoles, removeCol, searchCol } from '../../../shared/queries/Collaborateur/query';
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
  roles :Collaborateur[];
  selectedRoles = [];
  test : boolean;

  dtOptions: DataTables.Settings = {};

  constructor(private apollo: Apollo,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu : [5, 10, 25],
      processing: true
    }
    this.getUsers();
    this.getRoles();
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

  getFilterUsers(selectedRoles: UserRole[]) {
    let variables;
    if(selectedRoles.length==0){
      variables={};
    }
    else{
      variables={selectedRoles};
    }
    this.apollo
      .query<any>({
        query: findFilterUsers,
        variables: variables
      })
      .subscribe(({ data }) => {
        this.users = [];
        this.users = data.findFilterUsers;
        if(data.findFilterUsers.length == 0){
          this.test = true;
          console.log("test",this.test,this.users.length)
        }
        else{
          this.test = false;
          console.log("test",this.test,this.users.length)
        }
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

  getRoles(){
    this.apollo
      .watchQuery<any>({
        query: findRoles,
      })
      .valueChanges.pipe(map((result) => result.data.findRoles))
      .subscribe((data) => {
        this.roles = data;
        console.log('postes data:', data);
      });
      console.log('postes :', this.roles);
  }

  search(searchWord: string) {
    console.log("searchWord:",searchWord);
    if(searchWord){
      this.apollo
      .query<any>({
        query: searchCol,
        variables: {mot: searchWord},
      })
      .subscribe(({ data }) => {
        this.users = [];
        this.users = data.searchCol;
        if(data.searchCol.length == 0){
          this.test = true;
          console.log("test",this.test,this.users.length)
        }
        else{
          this.test = false;
          console.log("test",this.test,this.users.length)
        }
        console.log('users apres recherche:',this.users)
      });
    }
  }

}
