import { Component, OnInit } from '@angular/core';
import { Collaborateur } from 'src/app/Models/collaborateur';
import {Location} from '@angular/common';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-fiche-infos',
  templateUrl: './fiche-infos.component.html',
  styleUrls: ['./fiche-infos.component.css']
})
export class FicheInfosComponent implements OnInit {

  user: Collaborateur;
  idCol: number =2;

  constructor(
    // private apollo : Apollo,
    private auth: AuthService,
    private location: Location) { }

  ngOnInit(): void {
    this.user=this.auth.getUser();
    console.log("user fiche:",this.user)
    // this.getCol(this.idCol);

  }

  retour(){
    this.location.back();
  }

  // getCol(idCol: number) {
  //   // const datePipe = new DatePipe('En-FR');
  //   this.apollo.query<any>({
  //     query: findCol,
  //     variables: {idCol}
  //   }).subscribe(({data}) => {
  //     // data.findCol.dateNaiss = this.datePipe.transform(data.findCol.dateNaiss, 'dd/MM/yyyy');
  //     this.user = data.findCol;
  //     console.log('user :', this.user);
  //   });
  // }

  // enregistrerInfos(value: any)
  // {
  //   console.log("user here enregistrer: ",value);
  //   this.apollo.mutate({
  //     mutation: updateCol,
  //     variables: {updateColInput: value, idCol: this.idCol}
  //   }).subscribe(({data}: any)=> {
  //     console.log("data ap modif:", data)
  //   }
  //   );
  // }

  // enregistrerCertif(id:number,value: any)
  // {
  //   console.log("user here enregistrer: ",value);
  //   this.apollo.mutate({
  //     mutation: updateCertif,
  //     variables: {updateCertifInput: value, idCertif: id}
  //   }).subscribe(({data}: any)=> {
  //     console.log("certif ap modif:", data)
  //   }
  //   );
  // }

  // enregistrerLangue(id:number,value: any)
  // {
  //   console.log("user here enregistrer: ",value);
  //   this.apollo.mutate({
  //     mutation: updateLangue,
  //     variables: {updateLangueInput: value, idLangue: id}
  //   }).subscribe(({data}: any)=> {
  //     console.log("Langue ap modif:", data)
  //   }
  //   );
  // }

  // enregistrerCompetence(id:number,value: any)
  // {
  //   console.log("user here enregistrer: ",value);
  //   this.apollo.mutate({
  //     mutation: updateCompetence,
  //     variables: {updateCompetenceInput: value, idCompetence: id}
  //   }).subscribe(({data}: any)=> {
  //     console.log("Competence ap modif:", data)
  //   }
  //   );
  // }

  // enregistrerFormation(id:number,value: any)
  // {
  //   console.log("user here enregistrer: ",value);
  //   this.apollo.mutate({
  //     mutation: updateFormation,
  //     variables: {updateFormationInput: value, idFormation: id}
  //   }).subscribe(({data}: any)=> {
  //     console.log("Formation ap modif:", data)
  //   }
  //   );
  // }

  // enregistrerExperience(id:number,value: any)
  // {
  //   console.log("user here enregistrer: ",value);
  //   this.apollo.mutate({
  //     mutation: updateExperience,
  //     variables: {updateExperienceInput: value, idExperience: id}
  //   }).subscribe(({data}: any)=> {
  //     console.log("Experience ap modif:", data)
  //   }
  //   );
  // }

  // enregistrerAct(id:number,value: any)
  // {
  //   console.log("user here enregistrer: ",value);
  //   this.apollo.mutate({
  //     mutation: updateAct,
  //     variables: {updateActAssocInput: value, idAct: id}
  //   }).subscribe(({data}: any)=> {
  //     console.log("Act ap modif:", data)
  //   }
  //   );
  // }



}
