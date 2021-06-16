import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Collaborateur } from 'src/app/Models/collaborateur';
import { findCol, getUserAuth } from 'src/app/shared/queries/Collaborateur/query';
import { AuthService } from 'src/app/Services/auth.service';
import { UserRole } from 'src/app/Enums/UserRole';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  user: Collaborateur;
  role: string;
  roles= [UserRole.RP,UserRole.RH,UserRole.TEAMLEADER];

  constructor(
    private auth: AuthService) { }

  ngOnInit(): void {
    this.user=this.auth.getUser();
    console.log("user sidebar:",this.user);
    this.role=this.auth.getRole();
    console.log("role sidebar:",this.role);
    console.log("roles sidebar:",this.roles);
  }

}
