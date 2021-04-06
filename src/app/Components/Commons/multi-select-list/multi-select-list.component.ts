import { Component, OnInit } from '@angular/core';
import { Formation } from './../../../Models/formation';
import { findCompetences, findCvs, findFormations } from '../../../shared/Cv/query';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Cv } from './../../../Models/cv';
import { Experience } from './../../../Models/experience';
import { Competence } from './../../../Models/competence';

@Component({
  selector: 'app-multi-select-list',
  templateUrl: './multi-select-list.component.html',
  styleUrls: ['./multi-select-list.component.css'],
})
export class MultiSelectListComponent implements OnInit {

  public formations: Formation[];
  public cvs: Cv[];
  public experiences = [
    {id: 1, annee: 'débutant'},
    {id: 2, annee: '1 à 3ans'},
    {id: 3, annee: '3 à 5ans'},
    {id: 4, annee: '5 à 10ans'},
    {id: 5, annee: '+ 10ans'}
  ];
  public annees: number[];
  public competences: Competence[];
  public date;

  selected = [
    {
      id: 2,
      universite: 'Ecole Nationale d’ingénieurs de Carthage',
      dateDebut: '2015-08-31T23:00:00.000Z',
      dateFin: '2018-06-01T00:00:00.000Z',
      specialite: 'informatiques',
      niveau: 'Cycle ingénieur',
      mention: 'bien',
    },
  ];

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.getFormations();
    this.getPostes();
    this.getCompetences();
    // this.getAnneesExperiences();
  }

  getFormations(): Formation[] {
    this.apollo
      .watchQuery<any>({
        query: findFormations,
      })
      .valueChanges.pipe(map((result) => result.data.findFormations))
      .subscribe((data) => {
        this.formations = data;
        console.log('formations1 :', this.formations);
      });
    return this.formations;
  }

  getPostes(): Cv[] {
    this.apollo
      .watchQuery<any>({
        query: findCvs,
      })
      .valueChanges.pipe(map((result) => result.data.findCvs))
      .subscribe((data) => {
        this.cvs = data;
        console.log('cvs :', this.cvs);
      });
    return this.cvs;
  }

  getCompetences(): Competence[] {
    this.apollo
      .watchQuery<any>({
        query: findCompetences,
      })
      .valueChanges.pipe(map((result) => result.data.findCompetences))
      .subscribe((data) => {
        this.competences = data;
        console.log('competences :', this.competences);
      });
    return this.competences;
  }

  // getExperiences(idCv: number): Experience[] {
  //   this.apollo.query<any>({
  //     query: findExperiencesCv,
  //     variables: {idCv}
  //   }).subscribe(({data}) => {
  //     this.experiences = data.findExperiencesCv;
  //     console.log("experiences:",this.experiences);
  //   });
  //   return this.experiences;
  // }

  // getAnneesExperiences(){
  //   // for(var cv of this.cvs){
  //     var somme=0;
  //     this.experiences=this.getExperiences(1);
  //     for(var exp of this.experiences){
  //       somme +=exp.dateDebut.getFullYear()-exp.dateFin.getFullYear()
  //     }
  //     this.annees.push(somme);
  //   // }
  //   console.log("annee exp:",this.annees)
  // }
}
