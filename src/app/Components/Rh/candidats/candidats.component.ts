
import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {map} from 'rxjs/operators'
import { Router } from '@angular/router';
import { Cv } from 'src/app/Models/cv';
import { ToastrService } from 'ngx-toastr';
import { findPersonnes, removePersonne, updateRecommande } from 'src/app/shared/Candidat/query';
import { Personne } from './../../../Models/personne';

@Component({
  selector: 'app-candidats',
  templateUrl: './candidats.component.html',
  styleUrls: ['./candidats.component.css']
})
export class CandidatsComponent implements OnInit {

  candidats: Personne[];
  myUser: Personne;
  marked=false;
  // public universites: Formation[];
  // public specialites: Formation[];
  // public nivFormation: Formation[];
  public cvs: Cv[];
  public experiences = [
    {id: 1, annee: 'débutant'},
    {id: 2, annee: '1 à 3ans'},
    {id: 3, annee: '3 à 5ans'},
    {id: 4, annee: '5 à 10ans'},
    {id: 5, annee: '+ 10ans'}
  ];
  public annees: number[];
  // public competences: Competence[];

  selectedNiv: string[];
  selectedExp: string[];
  selectedCompetence: string[];
  selectedPoste: string[];
  selectedUniver: string[];
  selectedSpec: string[];

  constructor(
    private apollo: Apollo,
    private router: Router,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.getCandidats();
    // this.getUniversites();
    // this.getNivForm();
    // this.getSpecialites();
    // this.getPostes();
    // this.getCompetences();
  }

  getCandidats() {
    this.apollo.watchQuery<any>({
      query: findPersonnes,
    })
      .valueChanges
      .pipe(
        map(result => result.data.findPersonnes)
      ).subscribe(data => {
      this.candidats = data;
      console.log("candidats :",this.candidats);
    });

  }

  changeRecommande(e,idPersonne: number){
    if (e.target.checked) {
      this.marked=true;}
    else{this.marked=false;}
    console.log("recommande:",this.marked)
    this.apollo.mutate({
      mutation: updateRecommande,
      variables: {idPersonne,value: this.marked}
    })
      .subscribe(({data}:any) => {
        console.log("data:",data);
        this.candidats = [];
        console.log("candidats:",this.candidats);
        this.getCandidats();
        console.log("candidats nv:",this.candidats);
    });
    // this.getCandidats();
  }


  deleteUser(idPersonne: number) {
    console.log("myUser:",this.myUser);
    this.candidats = this.candidats.filter(candidat => candidat.id !== idPersonne);
    // const deletedUser = this.candidats.filter(candidat => candidat.id === idCand)[0];
    // if (confirm('Are you sure to delete this user?')) {
    this.apollo.mutate({
      mutation: removePersonne,
      variables: {idPersonne}
    }).subscribe(res => {
      this.toastr.success('Good', 'Candidat supprimé');
      this.router.navigate(['candidats']);
      // this.rerender({newData: deletedUser, deleteOper: true});

    }, error => {
      this.toastr.error("suppression impossible!!", 'Error');
      console.log("suppression impossible!!")
    });
    // }
  }

  // getUniversites(): Formation[] {
  //   this.apollo
  //     .watchQuery<any>({
  //       query: findUniversites,
  //     })
  //     .valueChanges.pipe(map((result) => result.data.findUniversites))
  //     .subscribe((data) => {
  //       this.universites = data;
  //       console.log('Universites:', this.universites);
  //     });
  //   return this.universites;
  // }

  // getSpecialites(): Formation[] {
  //   this.apollo
  //     .watchQuery<any>({
  //       query: findSpecialites,
  //     })
  //     .valueChanges.pipe(map((result) => result.data.findSpecialites))
  //     .subscribe((data) => {
  //       this.specialites = data;
  //       console.log('Specialites:', this.specialites);
  //     });
  //   return this.specialites;
  // }

  // getNivForm(): Formation[] {
  //   this.apollo
  //     .watchQuery<any>({
  //       query: findNivFormations,
  //     })
  //     .valueChanges.pipe(map((result) => result.data.findNivFormations))
  //     .subscribe((data) => {
  //       this.nivFormation = data;
  //       console.log('Niv Formation:', this.nivFormation);
  //     });
  //   return this.nivFormation;
  // }

  // getPostes(): Cv[] {
  //   this.apollo
  //     .watchQuery<any>({
  //       query: findPostes,
  //     })
  //     .valueChanges.pipe(map((result) => result.data.findPostes))
  //     .subscribe((data) => {
  //       this.cvs = data;
  //       console.log('postes :', this.cvs);
  //     });
  //   return this.cvs;
  // }

  // getCompetences(): Competence[] {
  //   this.apollo
  //     .watchQuery<any>({
  //       query: findCompetences,
  //     })
  //     .valueChanges.pipe(map((result) => result.data.findCompetences))
  //     .subscribe((data) => {
  //       this.competences = data;
  //       console.log('competences :', this.competences);
  //     });
  //   return this.competences;
  // }

  // getFilterCands(selectedComp?: string[], selectedPoste?: string[], selectedUniver?: string[], selectedSpec?: string[], selectedNiv?: string[]) {
  //   this.apollo
  //     .query<any>({
  //       query: findFilterCands,
  //       variables: { selectedComp,selectedPoste, selectedUniver, selectedSpec, selectedNiv}
  //     })
  //     .subscribe(({ data }) => {
  //       this.candidats = [];
  //       this.candidats = data.findFilterCands;
  //       console.log('candsFilter:', data.findFilterCands);
  //     });
  // }

}
