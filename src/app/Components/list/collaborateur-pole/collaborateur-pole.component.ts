import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserRole } from 'src/app/Enums/UserRole';
import { Collaborateur } from 'src/app/Models/collaborateur';
import { Competence } from 'src/app/Models/competence';
import { Cv } from 'src/app/Models/cv';
import { Equipe } from 'src/app/Models/equipe';
import { AuthService } from 'src/app/Services/auth.service';
import { findCols, findEquipe, findEquipes, findEquipesPole, findFilterCols, findPole, findPostes, searchEquipe, searchPole } from 'src/app/shared/queries/Collaborateur/query';
import { findAllCompetences } from 'src/app/shared/queries/Cv';

@Component({
  selector: 'app-collaborateur-pole',
  templateUrl: './collaborateur-pole.component.html',
  styleUrls: ['./collaborateur-pole.component.css']
})
export class CollaborateurPoleComponent implements OnInit {

  public userRole: string;
  public equipe : number;
  public nomEquipe : string;
  public pole: number;
  public nomPole: string;
  public cols: Collaborateur[];
  public equipes: Equipe[];
  public postes: Collaborateur[];
  public cvs: Cv[];

  public competences: Competence[];
  public test : boolean;
  public subscription : Subscription;

  selectedEquipes: number[];
  selectedCompetence: string[];
  selectedPoste: string[];
  searchWord: string;

  dtOptions: DataTables.Settings = {};
  constructor(
    private apollo: Apollo,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu : [5, 10,25],
      processing: true
    }

    this.userRole=this.auth.getRole();
    if(this.userRole==UserRole.RP){
      this.pole=this.auth.getPole();
      this.getEquipesPoles([this.pole]);
      this.getPoleName(this.pole);
      console.log("nom equipe:",this.nomEquipe);
    }
    else if(this.userRole==UserRole.TEAMLEADER){
      this.equipe=this.auth.getEquipe();
      this.getEquipeName(this.equipe);
      console.log("nom pole:",this.nomPole);
    }
    this.getCompetences();
    this.getPostes();
    this.getCols();
  }

  getCols() {
    let variables;
    if (this.equipe) {
      variables = { equipe: this.equipe }
    }
    else if (this.pole) {
      variables = { pole: this.pole }
    }
    console.log("variables:", variables);
    this.subscription = this.apollo
      .watchQuery<any>({
        query: findCols,
        variables: variables
      })
      .valueChanges.pipe(map((result) => result.data.findCols))
      .subscribe((data) => {
        this.cols = data;
        console.log('cols :', this.cols);
        this.subscription.unsubscribe();
      });
  }

  getFilterCols(selectedEquipes?: number[], selectedComp?: string[],
    selectedPoste?: string[]) {
    let variables;
    if (this.equipe) {
      variables = { selectedEquipes: this.equipe, selectedComp, selectedPoste }
    }
    else if (this.pole) {
      variables = { selectedPoles: this.pole, selectedEquipes, selectedComp, selectedPoste }
    }
    this.subscription = this.apollo
      .query<any>({
        query: findFilterCols,
        variables: variables
      })
      .subscribe(({ data }) => {
        this.cols = [];
        this.cols = data.findFilterCols;
        if (data.findFilterCols.length == 0) {
          this.test = true;
          console.log("test", this.test, this.cols.length)
        }
        else {
          this.test = false;
          console.log("test", this.test, this.cols.length)
        }
        // this.dataSource = new MatTableDataSource(this.cols);
        console.log('colsFilter:', data.findFilterCols);
        this.subscription.unsubscribe();
      });
  }

  search(word: string) {
    if (this.userRole == UserRole.TEAMLEADER) {
      console.log("search teamleader");
      this.searchEquipe(word);
    }
    else if (this.userRole == UserRole.RP) {
      this.searchPole(word);
      console.log("nom pole2:", this.nomPole);
      console.log("search RP");
    }
  }

  searchPole(searchWord: string) {
    console.log("searchWord:", searchWord);
    console.log("nom pole3:", this.nomPole);
    if (searchWord) {
      this.subscription = this.apollo
        .query<any>({
          query: searchPole,
          variables: { mot: searchWord, pole: this.nomPole },
        })
        .subscribe(({ data }) => {
          this.cols = [];
          this.cols = data.searchPole;
          if (data.searchPole.length == 0) {
            this.test = true;
            console.log("test", this.test, this.cols.length)
          }
          else {
            this.test = false;
            console.log("test", this.test, this.cols.length)
          }
          console.log('cols pole apres recherche:', this.cols)
          this.subscription.unsubscribe();
        });
    }
  }

  searchEquipe(searchWord: string) {
    console.log("searchWord:", searchWord);
    if (searchWord) {
      this.subscription = this.apollo
        .query<any>({
          query: searchEquipe,
          variables: { mot: searchWord, equipe: this.nomEquipe },
        })
        .subscribe(({ data }) => {
          this.cols = [];
          this.cols = data.searchEquipe;
          if (data.searchEquipe.length == 0) {
            this.test = true;
            console.log("test", this.test, this.cols.length)
          }
          else {
            this.test = false;
            console.log("test", this.test, this.cols.length)
          }
          console.log('cols equipe apres recherche:', this.cols)
          this.subscription.unsubscribe();
        });
    }
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
        variables: { idPoles: selectedPoles }
      })
      .valueChanges.pipe(map((result) => result.data.findEquipesPole))
      .subscribe((data) => {
        this.equipes = data;
      });
    console.log('Equipes poles:', this.equipes);
  }

  getPostes() {
    let variables;
    if (this.equipe) {
      variables = { equipe: this.equipe }
    }
    else if (this.pole) {
      variables = { pole: this.pole }
    }
    else {
      variables = {}
    }
    this.apollo
      .watchQuery<any>({
        query: findPostes,
        variables: variables
      })
      .valueChanges.pipe(map((result) => result.data.findPostes))
      .subscribe((data) => {
        this.postes = data;
        console.log('postes data:', data);
      });
    console.log('postes :', this.postes);
  }

  async getCompetences() {
    await this.apollo
      .watchQuery<any>({
        query: findAllCompetences,
      })
      .valueChanges.pipe(map((result) => result.data.findAllCompetences))
      .subscribe((data) => {
        this.competences = data;
        console.log('competences :', data);
      });
    console.log('competences :', this.competences);
  }

  getEquipeName(idEquipe: number) {
    this.apollo
      .watchQuery<any>({
        query: findEquipe,
        variables: { idEquipe }
      })
      .valueChanges.pipe(map((result) => result.data.findEquipe))
      .subscribe((data) => {
        this.nomEquipe = data.nom;
      });
  }

  getPoleName(idPole: number) {
    this.apollo
      .watchQuery<any>({
        query: findPole,
        variables: { idPole }
      })
      .valueChanges.pipe(map((result) => result.data.findPole))
      .subscribe((data) => {
        this.nomPole = data.nom;
      });
  }

}
