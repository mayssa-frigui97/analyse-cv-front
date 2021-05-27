import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { findCol, getUserAuth } from '../../shared/Collaborateur/query';
import { Collaborateur } from '../../Models/collaborateur';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: Collaborateur;
  idCol: number =2;

  constructor(
    // private apollo : Apollo,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.user=this.auth.getUser();
    console.log("user header:",this.user)
    // this.getCol(this.idCol);
    // this.getCol();
  }

  logout() {
    this.auth.logout();
  }

  // getCol(idCol: number) {
  //   this.apollo.query<any>({
  //     query: findCol,
  //     variables: {idCol: this.idCol}
  //   }).subscribe(({data}) => {
  //     this.user = data.findCol;
  //     console.log('user :', this.user);
  //   });
  // }

  // getCol() {
  //   this.apollo.query<any>({
  //     query: getUserAuth
  //   }).subscribe(({data}) => {
  //     this.user = data.getUserAuth;
  //     console.log('user :', this.user);
  //   });
  // }

}
