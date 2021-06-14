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
  pole: number;
  equipe: number;

  constructor(private myRoute: Router) { }

  sendToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  sendRole(role: UserRole) {
    console.log("send role",role);
    localStorage.setItem('LoggedInUserROLE', role);
  }

  getRole() {
    this.role = localStorage.getItem('LoggedInUserROLE');
    console.log("get role",this.role);
    return this.role;
  }

  sendPole(pole: number) {
    console.log("send pole",pole);
    localStorage.setItem('LoggedInPOLE', pole.toString());
  }

  getPole() {
    this.pole = parseInt(localStorage.getItem('LoggedInPOLE'));
    console.log("get pole",this.pole);
    return this.pole;
  }

  sendEquipe(equipe: number) {
    console.log("send equipe",equipe);
    localStorage.setItem('LoggedInEQUIPE', equipe.toString());
  }

  getEquipe() {
    this.equipe = parseInt(localStorage.getItem('LoggedInEQUIPE'));
    console.log("get role",this.equipe);
    return this.equipe;
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
