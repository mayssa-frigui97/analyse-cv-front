import { Collaborateur } from './../../../Models/collaborateur';
import { ChangeDetectorRef, Component, OnInit, ViewChild, AfterViewInit, Pipe } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { findCols, findEquipes, findEquipesPole, findFilterCols, findPoles } from 'src/app/shared/Collaborateur/query';
import { map } from 'rxjs/operators';
import { Equipe } from './../../../Models/equipe';
import { Pole } from './../../../Models/pole';
import { Subject } from 'rxjs';
import { DataTableDirective,DataTablesModule } from 'angular-datatables';
import { Competence } from 'src/app/Models/competence';
import { Cv } from 'src/app/Models/cv';
import { Formation } from 'src/app/Models/formation';
import { findCompetences, findNivFormations, findPostes, findSpecialites, findUniversites } from 'src/app/shared/Cv/query';
// import * as jquery from 'jquery';
// import 'datatables.net';
// import 'datatables.net-bs4';


@Component({
  selector: 'app-collaborateurs',
  templateUrl: './collaborateurs.component.html',
  styleUrls: ['./collaborateurs.component.css'],
})
export class CollaborateursComponent implements OnInit{
  public cols: Collaborateur[];
  public equipes: Equipe[];
  public poles: Pole[];
  public rpId: number;
  public universites: Formation[];
  public specialites: Formation[];
  public nivFormation: Formation[];
  public cvs: Cv[];
  public annees: number[];
  public competences: Competence[];

  public projets = [
    { id: 1, nom: 'Application mobile Amen Bank' },
    { id: 2, nom: 'Application mobile BTK Bank' },
    { id: 3, nom: 'Application web Amen Bank' },
    { id: 4, nom: 'Application web BTK Bank' },
  ];
  public experiences = [
    {id: 1, annee: 'débutant'},
    {id: 2, annee: '1 à 3ans'},
    {id: 3, annee: '3 à 5ans'},
    {id: 4, annee: '5 à 10ans'},
    {id: 5, annee: '+ 10ans'}
  ];

  selectedProjets: number[]=[];
  selectedEquipes: number[];
  selectedPoles: number[];
  selectedNiv: string[];
  selectedExp: string[];
  selectedCompetence: string[];
  selectedPoste: string[];
  selectedUniver: string[];
  selectedSpec: string[];
  // détecteur de changement recherche le premier élément ou la directive correspondant au sélecteur dans la vue DOM.
  // Si un nouvel enfant correspond au sélecteur, la propriété est mise à jour.

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtInstance:Promise<DataTables.Api>;
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private apollo: Apollo,
    // private changeDetectorRefs: ChangeDetectorRef
    ) {}

  ngOnInit(): void {
    this.getCols();
    this.getEquipes();
    this.getPoles();
    this.getUniversites();
    this.getNivForm();
    this.getSpecialites();
    this.getPostes();
    this.getCompetences();
  }

  getCols() {
    this.apollo
      .watchQuery<any>({
        query: findCols,
      })
      .valueChanges.pipe(map((result) => result.data.findCols))
      .subscribe((data) => {
        this.cols = data;
        console.log('cols :', this.cols);
      });
  }

  getFilterCols(selectedPoles: number[],selectedEquipes: number[],
    selectedComp?: string[], selectedPoste?: string[], selectedUniver?: string[],
    selectedSpec?: string[], selectedNiv?: string[]) {
    this.apollo
      .query<any>({
        query: findFilterCols,
        variables: { selectedPoles, selectedEquipes, selectedComp, selectedPoste, selectedUniver, selectedSpec, selectedNiv}
      })
      .subscribe(({ data }) => {
        this.cols = [];
        this.cols = data.findFilterCols;
        console.log('colsFilter:', data.findFilterCols);
      });
  }

  getPoles() {
    this.apollo
      .watchQuery<any>({
        query: findPoles,
      })
      .valueChanges.pipe(map((result) => result.data.findPoles))
      .subscribe((data) => {
        this.poles = data;
      });
    console.log('Poles :', this.poles);
  }

  getEquipes() {
    this.apollo
      .watchQuery<any>({
        query: findEquipes,
      })
      .valueChanges.pipe(map((result) => result.data.findEquipes))
      .subscribe((data) => {
        this.equipes = data;
      });
    console.log('Equipes :', this.equipes);
  }

  getEquipesPoles(selectedPoles: number[]) {
    this.apollo
      .watchQuery<any>({
        query: findEquipesPole,
        variables: {idPoles: selectedPoles}
      })
      .valueChanges.pipe(map((result) => result.data.findEquipesPole))
      .subscribe((data) => {
        this.equipes = data;
      });
    console.log('Equipes poles:', this.equipes);
  }

  //n 'est pas utilisée : non fonctionnelle
  rerender({ newData, filterOper = false }): void {
    console.log("dtelement:",this.dtElement)
    if (this.dtElement.dtInstance) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();

        // Remove old data
        this.cols = this.cols.filter((val) => val.id !== newData.id);

        // Only if it isn't a delete operation
        if (!filterOper) {
          this.cols.push(newData);
        }
        // Call the dtTrigger to rerender again
        this.dtTrigger.next();
      });
    } else {
      this.dtTrigger.next();
    }
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
}
