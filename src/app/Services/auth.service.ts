import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Collaborateur } from './../Models/collaborateur';
import { UserRole } from 'src/app/Enums/UserRole';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Collaborateur;
  role: string;

  constructor(private myRoute: Router) { }

  sendToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  sendRole(role: UserRole) {
    localStorage.setItem('LoggedInUserROLE', role);
  }

  getrole() {
    this.role = localStorage.getItem('LoggedInUserROLE');
    return atob(this.role);
  }

  sendUser(user: Collaborateur) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify( this.user));
  }

  getUser() :Collaborateur{
    return JSON.parse(localStorage.getItem('user'));

  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  isLoggednIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('access_token');
    // localStorage.removeItem('LoggedInUserROLE');
    localStorage.removeItem('user');
    this.myRoute.navigate(['']);
  }

  // public isAdmin(){
  //   if(this.user){
  //     if(this.user.role==UserRole.ADMIN)
  //       return true;
  //   }
  //   return false;
  // }

  public isCol(){
    if(this.user){
      if(this.user.role==UserRole.COLLABORATEUR)
        return true;
    }
    return false;
  }

  public isRH(){
    if(this.user){
      if(this.user.role==UserRole.RH)
      return true;
    }
    return false;
  }

  public isRP(){
    if(this.user){
      if(this.user.role===UserRole.RP)
        return true;
    }
    return false;
  }

  public isTeamLeader(){
    if(this.user){
      if(this.user.role===UserRole.TEAMLEADER)
        return true;
    }
    return false;
  }

}
