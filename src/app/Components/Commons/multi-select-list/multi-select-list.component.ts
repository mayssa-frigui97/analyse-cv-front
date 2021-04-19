import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Formation } from './../../../Models/formation';
import { findCompetences, findNivFormations, findPostes, findSpecialites, findUniversites } from '../../../shared/Cv/query';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Cv } from './../../../Models/cv';
import { Experience } from './../../../Models/experience';
import { Competence } from './../../../Models/competence';

import { findCandidats } from 'src/app/shared/Candidat/query';
import { Candidat } from 'src/app/Models/candidat';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-multi-select-list',
  templateUrl: './multi-select-list.component.html',
  styleUrls: ['./multi-select-list.component.css'],
})
export class MultiSelectListComponent implements  OnInit{

  public universites: Formation[];
  public specialites: Formation[];
  public nivFormation: Formation[];
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

  selectedNiv: string[];
  selectedExp: string[];
  selectedCompetence: string[];
  selectedPoste: string[];
  selectedUniver: string[];
  selectedSpec: string[];

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.getUniversites();
    this.getNivForm();
    this.getSpecialites();
    this.getPostes();
    this.getCompetences();
    // this.selectedExp = this.experiences[0].annee;
    // console.log("selectexp:",this.selectedExp)
    // // this.getAnneesExperiences();
    // this.selectedNiv = this.formations[0].niveau;
    // console.log("selectniv:",this.selectedNiv)
  }

  getUniversites(): Formation[] {
    this.apollo
      .watchQuery<any>({
        query: findUniversites,
      })
      .valueChanges.pipe(map((result) => result.data.findUniversites))
      .subscribe((data) => {
        this.universites = data;
        console.log('Universites:', this.universites);
      });
    return this.universites;
  }

  getSpecialites(): Formation[] {
    this.apollo
      .watchQuery<any>({
        query: findSpecialites,
      })
      .valueChanges.pipe(map((result) => result.data.findSpecialites))
      .subscribe((data) => {
        this.specialites = data;
        console.log('Specialites:', this.specialites);
      });
    return this.specialites;
  }

  getNivForm(): Formation[] {
    this.apollo
      .watchQuery<any>({
        query: findNivFormations,
      })
      .valueChanges.pipe(map((result) => result.data.findNivFormations))
      .subscribe((data) => {
        this.nivFormation = data;
        console.log('Niv Formation:', this.nivFormation);
      });
    return this.nivFormation;
  }

  getPostes(): Cv[] {
    this.apollo
      .watchQuery<any>({
        query: findPostes,
      })
      .valueChanges.pipe(map((result) => result.data.findPostes))
      .subscribe((data) => {
        this.cvs = data;
        console.log('postes :', this.cvs);
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
  //     var exp of this.experiencesfor(){
  //       somme +=exp.dateDebut.getFullYear()-exp.dateFin.getFullYear()
  //     }
  //     this.annees.push(somme);
  //   // }
  //   console.log("annee exp:",this.annees)
  // }

//   @ViewChild(MatPaginator) paginator: MatPaginator;
//   @ViewChild(MatSort) sort: MatSort;

//   // const noms = [
//   //   { display: 'Referral', value: 'REFERRAL' },
//   //   { display: 'Email', value: 'EMAIL' },
//   //   { display: 'Inbound Call', value: 'INBOUND_SALES_CALL' },
//   //   { display: 'Website Form', value: 'WEBSITE_FORM' },
//   //   { display: 'Walk-In', value: 'WALKIN' },
//   //   { display: 'Chatbot', value: 'CHATBOT' },
//   //   { display: 'Other', value: 'OTHER' }
//   // ];

//   // filterSelectObj = [];
//   dataSource: MatTableDataSource<Candidat>;
//   displayedColumns: string[] = ['nom','prenom', 'cin', 'dateNaiss', 'adresse', 'tel', 'email','poste'];
//   // filterSelectObj = [];
//   nomFilter = new FormControl('');
//   prenomFilter = new FormControl('');
//   filterValues: any = {
//     nom: '',
//     prenom: ''
//   }
//   constructor(private apollo: Apollo) {
//     // this.filterSelectObj = [
//     //   {
//     //     name: 'nom',
//     //     columnProp: 'nom',
//     //     options: []
//     //   }, {
//     //     name: 'prenom',
//     //     columnProp: 'prenom',
//     //     options: []
//     //   }, {
//     //     name: 'cin',
//     //     columnProp: 'cin',
//     //     options: []
//     //   }, {
//     //     name: 'dateNaiss',
//     //     columnProp: 'dateNaiss',
//     //     options: []
//     //   }, {
//     //     name: 'adresse',
//     //     columnProp: 'adresse',
//     //     options: []
//     //   }, {
//     //     name: 'tel',
//     //     columnProp: 'tel',
//     //     options: []
//     //   }, {
//     //     name: 'email',
//     //     columnProp: 'email',
//     //     options: []
//     //   }
//     // ]
//   }

//   ngAfterViewInit() {
//     // this.dataSource.paginator = this.paginator;
//   }

//   ngOnInit() {
//     this.getCandidats();
//     // this.dataSource.filterPredicate = this.createFilter();
//     this.fieldListener();
//   }

//   private fieldListener() {
//     this.nomFilter.valueChanges
//       .subscribe(
//         status => {
//           this.filterValues.status = status;
//           this.dataSource.filter = JSON.stringify(this.filterValues);
//         }
//       )
//     this.prenomFilter.valueChanges
//       .subscribe(
//         source => {
//           this.filterValues.source = source;
//           this.dataSource.filter = JSON.stringify(this.filterValues);
//         }
//       )
//   }

//   // getFilterObject(fullObj, key) {
//   //   const uniqChk = [];
//   //   fullObj.filter((obj) => {
//   //     if (!uniqChk.includes(obj[key])) {
//   //       uniqChk.push(obj[key]);
//   //     }
//   //     return obj;
//   //   });
//   //   return uniqChk;
//   // }

//   getCandidats() {
//     this.apollo.watchQuery<any>({
//       query: findCandidats,
//     })
//       .valueChanges
//       .pipe(
//         map(result => result.data.findCandidats)
//       ).subscribe(data => {
//       console.log("candidats1:",data);
//       this.dataSource.data = data;
//       console.log("candidats:",this.dataSource.data);
//       this.dataSource.paginator = this.paginator;
//       this.dataSource.sort = this.sort;
//       this.dataSource.filterPredicate = this.createFilter();
//     });
//   }

//   // filterChange(filter, event) {
//   //   //let filterValues = {}
//   //   this.filterValues[filter.columnProp] = event.target.value.trim().toLowerCase()
//   //   this.dataSource.filter = JSON.stringify(this.filterValues)
//   // }

//   clearFilter() {
//     // this.filterValues = {}
//     // this.filterSelectObj.forEach((value, key) => {
//     //   value.modelValue = undefined;
//     // })
//     // this.dataSource.filter = "";
//     this.nomFilter.setValue('');
//     this.prenomFilter.setValue('');
//   }

//   createFilter() {
//   //   let filterFunction = function (data: any, filter: string): boolean {
//   //     let searchTerms = JSON.parse(filter);
//   //     let isFilterSet = false;
//   //     for (const col in searchTerms) {
//   //       if (searchTerms[col].toString() !== '') {
//   //         isFilterSet = true;
//   //       } else {
//   //         delete searchTerms[col];
//   //       }
//   //     }

//   //     console.log(searchTerms);

//   //     let nameSearch = () => {
//   //       let found = false;
//   //       if (isFilterSet) {
//   //         for (const col in searchTerms) {
//   //           searchTerms[col].trim().toLowerCase().split(' ').forEach(word => {
//   //             if (data[col].toString().toLowerCase().indexOf(word) != -1 && isFilterSet) {
//   //               found = true
//   //             }
//   //           });
//   //         }
//   //         return found
//   //       } else {
//   //         return true;
//   //       }
//   //     }
//   //     return nameSearch()
//   //   }
//   //   return filterFunction
//   let filterFunction = function (data: any, filter: string): boolean{
//     let searchTerms = JSON.parse(filter);

//     return data.nom.indexOf(searchTerms.nom) !== -1
//       && data.prenom.indexOf(searchTerms.prenom) !== -1;
//   }

//   return filterFunction;

// }

}
