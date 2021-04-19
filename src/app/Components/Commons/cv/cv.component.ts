import { Cv } from './../../../Models/cv';
import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { findCvCol, updateAct, updateCertif, updateCompetence, updateExperience, updateFormation, updateLangue } from './../../../shared/Cv/query';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { updateCol } from 'src/app/shared/Collaborateur';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CvComponent implements OnInit {

  cv: Cv;

  constructor(private apollo : Apollo,
    private activatedRoute: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.getCv(id);
    console.log("cv:",this.cv);
  }

  getCv(idCand: number) {
    console.log("tesssssssssssssssssst")
    this.apollo.query<any>({
      query: findCvCol,
      variables: {idCand}
    }).subscribe(({data}) => {
      this.cv = data.findCvCandidat;
      console.log("data:",this.cv);
    });
  }

  enregistrerInfos(value: any)
  {
    console.log("user here enregistrer: ",value);
    this.apollo.mutate({
      mutation: updateCol,
      variables: {updateColInput: value, idCol: this.cv.personne.id}
    }).subscribe(({data}: any)=> {
      console.log("data ap modif:", data)
    }
    );
  }

  enregistrerCertif(id:number,value: any)
  {
    console.log("user here enregistrer: ",value);
    this.apollo.mutate({
      mutation: updateCertif,
      variables: {updateCertifInput: value, idCertif: id}
    }).subscribe(({data}: any)=> {
      console.log("certif ap modif:", data)
    }
    );
  }

  enregistrerLangue(id:number,value: any)
  {
    console.log("user here enregistrer: ",value);
    this.apollo.mutate({
      mutation: updateLangue,
      variables: {updateLangueInput: value, idLangue: id}
    }).subscribe(({data}: any)=> {
      console.log("Langue ap modif:", data)
    }
    );
  }

  enregistrerCompetence(id:number,value: any)
  {
    console.log("user here enregistrer: ",value);
    this.apollo.mutate({
      mutation: updateCompetence,
      variables: {updateCompetenceInput: value, idCompetence: id}
    }).subscribe(({data}: any)=> {
      console.log("Competence ap modif:", data)
    }
    );
  }

  enregistrerFormation(id:number,value: any)
  {
    console.log("user here enregistrer: ",value);
    this.apollo.mutate({
      mutation: updateFormation,
      variables: {updateFormationInput: value, idFormation: id}
    }).subscribe(({data}: any)=> {
      console.log("Formation ap modif:", data)
    }
    );
  }

  enregistrerExperience(id:number,value: any)
  {
    console.log("user here enregistrer: ",value);
    this.apollo.mutate({
      mutation: updateExperience,
      variables: {updateExperienceInput: value, idExperience: id}
    }).subscribe(({data}: any)=> {
      console.log("Experience ap modif:", data)
    }
    );
  }

  enregistrerAct(id:number,value: any)
  {
    console.log("user here enregistrer: ",value);
    this.apollo.mutate({
      mutation: updateAct,
      variables: {updateActAssocInput: value, idAct: id}
    }).subscribe(({data}: any)=> {
      console.log("Act ap modif:", data)
    }
    );
  }

  retour(){
    this.location.back();
  }
}
