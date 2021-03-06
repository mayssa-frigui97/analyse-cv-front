import { Collaborateur } from '../../../Models/collaborateur';
import { Component, OnInit} from '@angular/core';
import { Apollo } from 'apollo-angular';
import { findCols, findEquipe, findEquipes, findEquipesPole,  findFilterCols,  findPole,  findPoles, findPostes, removeCol, searchCol, searchEquipe, searchPole } from 'src/app/shared/queries/Collaborateur/query';
import { map } from 'rxjs/operators';
import { Equipe } from '../../../Models/equipe';
import { Pole } from '../../../Models/pole';
import { Cv } from 'src/app/Models/cv';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { findAllCompetences} from 'src/app/shared/queries/Cv/query';
import { Competence } from '../../../Models/competence';
import { AuthService } from 'src/app/Services/auth.service';
import { UserRole } from 'src/app/Enums/UserRole';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-collaborateurs',
  templateUrl: './collaborateurs.component.html',
  styleUrls: ['./collaborateurs.component.css'],
})
export class CollaborateursComponent implements OnInit{
  // public userRole: string;
  // public equipe : number;
  // public nomEquipe : string;
  // public pole: number;
  // public nomPole: string;
  public cols: Collaborateur[] = [];
  public equipes: Equipe[];
  public postes: Collaborateur[];
  public poles: Pole[];
  public rpId: number;
  public cvs: Cv[];

  public competences: Competence[];
  public myUser: Collaborateur;
  public test : boolean;
  public subscription : Subscription;

  selectedEquipes: number[];
  selectedPoles: number[];
  selectedCompetence: string[];
  selectedPoste: string[];
  searchWord: string;

  dtOptions: DataTables.Settings = {};

  constructor(
    private apollo: Apollo,
    private router: Router,
    private toastr: ToastrService,
    private auth: AuthService
    ) {

    }

    ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu : [5, 10,25],
      processing: true
    }

    // this.userRole=this.auth.getRole();
    // if(this.userRole==UserRole.RP){
    //   this.pole=this.auth.getPole();
    //   this.getEquipesPoles([this.pole]);
    //   this.getPoleName(this.pole);
    //   console.log("nom equipe:",this.nomEquipe);
    // }
    // else if(this.userRole==UserRole.TEAMLEADER){
    //   this.equipe=this.auth.getEquipe();
    //   this.getEquipeName(this.equipe);
    //   console.log("nom pole:",this.nomPole);
    // }
    // else{
      // }
    this.getEquipes();
    this.getPoles();
    this.getCompetences();
    this.getPostes();
    this.getCols();
  }

  getCols() {
    // let variables;
    // if(this.equipe){
    //   variables={equipe: this.equipe}
    // }
    // else if(this.pole){
    //   variables={pole: this.pole}
    // }
    // else{
    //   variables={}
    // }
    // console.log("variables:",variables);
    this.apollo
    .query<any>({
        query: findCols
      })
      .subscribe(({data}) => {

        console.log(data)

        this.cols = data.findCols;
        // console.log('cols :', this.cols);
        // this.subscription.unsubscribe();
      }, err => {
        console.log(err);

      });
  }

  getFilterCols(selectedPoles?: number[],selectedEquipes?: number[],
    selectedComp?: string[], selectedPoste?: string[]) {
    // let variables;
    // if(this.equipe){
    //   variables={selectedEquipes: this.equipe, selectedComp, selectedPoste}
    // }
    // else if(this.pole){
    //   variables={selectedPoles: this.pole, selectedEquipes, selectedComp, selectedPoste}
    // }
    // else{
    //   variables={selectedPoles, selectedEquipes, selectedComp, selectedPoste}
    // }
    this.subscription= this.apollo
      .query<any>({
        query: findFilterCols,
        variables: {selectedPoles, selectedEquipes, selectedComp, selectedPoste}
      })
      .subscribe(({ data }) => {
        this.cols = [];
        this.cols = data.findFilterCols;
        if(data.findFilterCols.length == 0){
          this.test = true;
          console.log("test",this.test,this.cols.length)
        }
        else{
          this.test = false;
          console.log("test",this.test,this.cols.length)
        }
        console.log('colsFilter:', data.findFilterCols);
        this.subscription.unsubscribe();
      });
  }

  search(searchWord: string) {
    console.log("searchWord:",searchWord);
    if(searchWord){
      this.subscription= this.apollo
      .query<any>({
        query: searchCol,
        variables: {mot: searchWord},
      })
      .subscribe(({ data }) => {
        this.cols = [];
        this.cols = data.searchCol;
        if(data.searchCol.length == 0){
          this.test = true;
          console.log("test",this.test,this.cols.length)
        }
        else{
          this.test = false;
          console.log("test",this.test,this.cols.length)
        }
        console.log('cols apres recherche:',this.cols)
        this.subscription.unsubscribe();
      });
    }
  }

  // search(word : string){
  //   if (this.userRole == UserRole.TEAMLEADER){
  //     console.log("search teamleader");
  //     this.searchEquipe(word);
  //   }
  //   else if (this.userRole == UserRole.RP){
  //     this.searchPole(word);
  //     console.log("nom pole2:",this.nomPole);
  //     console.log("search RP");
  //   }
  //   else{
  //     this.searchCol(word);
  //     console.log("search RH");
  //   }
  // }

  // searchPole(searchWord: string) {
  //   console.log("searchWord:",searchWord);
  //   console.log("nom pole3:",this.nomPole);
  //   if(searchWord){
  //     this.subscription= this.apollo
  //     .query<any>({
  //       query: searchPole,
  //       variables: {mot: searchWord, pole: this.nomPole},
  //     })
  //     .subscribe(({ data }) => {
  //       this.cols = [];
  //       this.cols = data.searchPole;
  //       if(data.searchPole.length == 0){
  //         this.test = true;
  //         console.log("test",this.test,this.cols.length)
  //       }
  //       else{
  //         this.test = false;
  //         console.log("test",this.test,this.cols.length)
  //       }
  //       console.log('cols pole apres recherche:',this.cols)
  //       this.subscription.unsubscribe();
  //     });
  //   }
  // }

  // searchEquipe(searchWord: string) {
  //   console.log("searchWord:",searchWord);
  //   if(searchWord){
  //     this.subscription= this.apollo
  //     .query<any>({
  //       query: searchEquipe,
  //       variables: {mot: searchWord, equipe: this.nomEquipe},
  //     })
  //     .subscribe(({ data }) => {
  //       this.cols = [];
  //       this.cols = data.searchEquipe;
  //       if(data.searchEquipe.length == 0){
  //         this.test = true;
  //         console.log("test",this.test,this.cols.length)
  //       }
  //       else{
  //         this.test = false;
  //         console.log("test",this.test,this.cols.length)
  //       }
  //       console.log('cols equipe apres recherche:',this.cols)
  //       this.subscription.unsubscribe();
  //     });
  //   }
  // }

  deleteUser(idCol: number) {
    console.log("myUser:",this.myUser);
    this.cols = this.cols.filter(col => col.id !== idCol);
    this.apollo.mutate({
      mutation: removeCol,
      variables: {idCol}
    }).subscribe(res => {
      this.toastr.success('Good', 'Collaborateur supprim??');
      this.router.navigate(['collaborateurs']);

    }, error => {
      this.toastr.error("suppression impossible!!", 'Error');
      console.log("suppression impossible!!")
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

  getPostes(){
    // let variables;
    // if(this.equipe){
    //   variables={equipe: this.equipe}
    // }
    // else if(this.pole){
    //   variables={pole: this.pole}
    // }
    // else{
    //   variables={}
    // }
    this.apollo
      .watchQuery<any>({
        query: findPostes
      })
      .valueChanges.pipe(map((result) => result.data.findPostes))
      .subscribe((data) => {
        this.postes = data;
        console.log('postes data:', data);
      });
      console.log('postes :', this.postes);
  }

  async getCompetences() {
    await  this.apollo
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

  // getEquipeName(idEquipe:number){
  //   this.apollo
  //     .watchQuery<any>({
  //       query: findEquipe,
  //       variables: {idEquipe}
  //     })
  //     .valueChanges.pipe(map((result) => result.data.findEquipe))
  //     .subscribe((data) => {
  //       this.nomEquipe=data.nom;
  //     });
  // }

  // getPoleName(idPole:number){
  //   this.apollo
  //     .watchQuery<any>({
  //       query: findPole,
  //       variables: {idPole}
  //     })
  //     .valueChanges.pipe(map((result) => result.data.findPole))
  //     .subscribe((data) => {
  //       this.nomPole=data.nom;
  //     });
  // }

}


