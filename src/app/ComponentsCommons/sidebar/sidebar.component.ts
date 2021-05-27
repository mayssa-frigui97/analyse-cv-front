import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Collaborateur } from 'src/app/Models/collaborateur';
import { findCol, getUserAuth } from 'src/app/shared/Collaborateur/query';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  user: Collaborateur;
  // idCol: number =2;

  constructor(
    // private apollo : Apollo,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.user=this.auth.getUser();
    console.log("user sidebar:",this.user)
    // this.getCol(this.idCol);
    // this.getCol();
  }

  // getCol(idCol: number) {
  //   this.apollo.query<any>({
  //     query: findCol,
  //     variables: {idCol}
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
