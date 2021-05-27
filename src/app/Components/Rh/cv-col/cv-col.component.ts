import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { findCol} from 'src/app/shared/Collaborateur';
import { Collaborateur } from 'src/app/Models/collaborateur';

@Component({
  selector: 'app-cv',
  templateUrl: './cv-col.component.html',
  styleUrls: ['./cv-col.component.css']
})
export class CvColComponent implements OnInit {

  col: Collaborateur;

  constructor(private apollo : Apollo,
    private activatedRoute: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.getCol(id);
    console.log("cv:",this.col);
  }

  getCol(idCol: number) {
    this.apollo.query<any>({
      query: findCol,
      variables: {idCol}
    }).subscribe(({data}) => {
      this.col = data.findCol;
      console.log("data:",this.col);
    });
  }

  // enregistrerInfos(value: any)
  // {
  //   console.log("user here enregistrer: ",value);
  //   this.apollo.mutate({
  //     mutation: updateCol,
  //     variables: {updateColInput: value, idCol: this.col.id}
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

  retour(){
    this.location.back();
  }
}
