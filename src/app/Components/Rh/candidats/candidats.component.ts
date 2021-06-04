
import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {map} from 'rxjs/operators'
import { Router } from '@angular/router';
import { Cv } from 'src/app/Models/cv';
import { ToastrService } from 'ngx-toastr';
import { findFilterCands, findPersonnes, removeCandidat, removePersonne, search, updateRecommande } from 'src/app/shared/Candidat/query';
import { Personne } from './../../../Models/personne';
import { Competence } from 'src/app/Models/competence';
import { findAllCompetences, uploadSigleFile } from 'src/app/shared/Cv/query';
import { createCol, findEquipes, findPermissions, findPoles, findRoles } from 'src/app/shared/Collaborateur/query';
import { Equipe } from './../../../Models/equipe';
import { Pole } from 'src/app/Models/pole';
import { Collaborateur } from './../../../Models/collaborateur';
import { NgForm } from '@angular/forms';
// const { makeExecutableSchema } = require('@graphql-tools/schema');
// const { GraphQLUpload } = require('graphql-upload');


// const typeDefs = `
//   scalar Upload
//   type file {
//     name: String
//   }
//   type Mutation {
//     Upload(file:Upload!): file
//   }
// `

// const resolvers = {
//   Mutation: {
//     Upload: async (root, { file }) => {
//       const { filename, mimetype, createReadStream } = await image
//       const stream = createReadStream()
//       // Promisify the stream and store the file, then…
//       return { name: filename }
//     }
//   }
// }

// const schema = makeExecutableSchema({
//   typeDefs: /* GraphQL */ `
//     scalar Upload
//   `,
//   resolvers: {
//     Upload: GraphQLUpload,
//   },
// });


// export const schema = makeExecutableSchema({ typeDefs, resolvers })

@Component({
  selector: 'app-candidats',
  templateUrl: './candidats.component.html',
  styleUrls: ['./candidats.component.css']
})
export class CandidatsComponent implements OnInit {

  public file: File = null;
  candidats: Personne[];
  myUser: Personne;
  marked : boolean;
  public test: boolean;
  public cvs: Cv[];
  equipes :Equipe[];
  poles: Pole[];
  // public diplomes = [
  //   {id: 1, nom: 'Licence'},
  //   {id: 2, nom: 'Master'},
  //   {id: 3, nom: 'Ingénieur'},
  //   {id: 4, nom: 'Doctorat'}
  // ];
  public competences: Competence[]=[];

  // selectedDiplome: string;
  // ids1:number[]=[];
  // ids2:number[]=[];
  selectedComp: string[];
  selectedPole: string;
  selectedTL: string;
  searchWord: string;
  roles: Collaborateur[];
  permissions: Collaborateur[];
  dtOptions: DataTables.Settings = {};

  constructor(
    private apollo: Apollo,
    private router: Router,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu : [5, 10, 25],
      processing: true
    }
    this.getCandidats();
    this.getCompetences();
    this.getEquipes();
    this.getPoles();
    this.getRoles();
    this.getPermissions();
  }

  async resolve(parent, { image }) {
    const { filename, mimetype, createReadStream } = await image;
    const stream = createReadStream();
    // Promisify the stream and store the file, then…
    return true;
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
        // this.candidats = [];
        console.log("candidats:",this.candidats);
        // this.getCandidats();
        console.log("candidats nv:",this.candidats);
    });
  }


  deleteCand(idPersonne: number) {
    console.log("myUser:",this.myUser);
    this.candidats = this.candidats.filter(candidat => candidat.id !== idPersonne);
    // const deletedUser = this.candidats.filter(candidat => candidat.id === idCand)[0];
    // if (confirm('Are you sure to delete this user?')) {
    this.apollo.mutate({
      mutation: removePersonne,
      variables: {idPersonne}
    }).subscribe(res => {
      this.toastr.success('Succès', 'Candidat supprimé');
      this.router.navigate(['candidats']);
      // this.rerender({newData: deletedUser, deleteOper: true});

    }, error => {
      this.toastr.error("suppression impossible!!", 'Erreur');
      console.log("suppression impossible!!")
    });
    // }
  }

  getCompetences(): Competence[] {
    this.apollo
      .watchQuery<any>({
        query: findAllCompetences,
      })
      .valueChanges.pipe(map((result) => result.data.findAllCompetences))
      .subscribe((data) => {
        this.competences = data;
        console.log('competences :', this.competences);
      });
    return this.competences;
  }

  async getFilterCands(selectedComp?: string[]) {
    let variables;
    if(selectedComp.length==0){
      variables={};
    }
    else{
      variables={selectedComp};
    }
    await this.apollo
      .query<any>({
        query: findFilterCands,
        variables: variables,
      })
      .subscribe(({ data }) => {
        this.candidats = [];
        this.candidats=data.findFilterCands;
        // this.dtOptions={...this.dtOptions}
        if(data.findFilterCands.length == 0){
          this.test = true;
          console.log("test",this.test,this.candidats.length)
        }
        else{
          this.test = false;
          console.log("test",this.test,this.candidats.length)
        }
        // console.log('candsFilter:', data.findFilterCands);
        console.log('candidats apres filter:',this.candidats)
      });
  }

  search(searchWord: string) {
    console.log("searchWord:",searchWord);
    if(searchWord){
      this.apollo
      .query<any>({
        query: search,
        variables: {mot: searchWord},
      })
      .subscribe(({ data }) => {
        this.candidats = [];
        this.candidats = data.search;
        if(data.search.length == 0){
          this.test = true;
          console.log("test",this.test,this.candidats.length)
        }
        else{
          this.test = false;
          console.log("test",this.test,this.candidats.length)
        }
        console.log('candidats apres recherche:',this.candidats)
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

  getRoles(){
    this.apollo
      .watchQuery<any>({
        query: findRoles,
      })
      .valueChanges.pipe(map((result) => result.data.findRoles))
      .subscribe((data) => {
        this.roles = data;
        console.log('postes data:', data);
      });
      console.log('postes :', this.roles);
  }

  getPermissions(){
    this.apollo
      .watchQuery<any>({
        query: findPermissions,
      })
      .valueChanges.pipe(map((result) => result.data.findPermissions))
      .subscribe((data) => {
        this.permissions = data;
        console.log('postes data:', data);
      });
      console.log('postes :', this.permissions);
  }

  affecterCandidat(formulaire, cand: Personne){
    console.log("candidat:",cand)
    console.log("formulaire: ",formulaire);
    let createColInput={
      cin: formulaire.cin,
      telPro: parseInt(formulaire.telPro),
      emailPro: formulaire.emailPro,
      poste: formulaire.poste,
      salaire: formulaire.salaire,
      dateEmb: formulaire.dateEmb,
      nomUtilisateur: formulaire.nomUtilisateur,
      motDePasse: formulaire.motDePasse,
      role: formulaire.role,
      permission: formulaire.permission,
      equipeId: parseInt(formulaire.equipe),
      nom: cand.nom,
      etatCivil: cand.etatCivil,
      dateNaiss: cand.dateNaiss,
      adresse: cand.adresse,
      tel: cand.tel,
      email: cand.email,
      recommande: cand.recommande,
      cvId: cand.cv.id
    }
    console.log("createcolinput:",createColInput)
    this.apollo.mutate({
      mutation: createCol,
      variables: {createColInput}
    }).subscribe(({data}: any)=> {
      console.log("data ap creation:", data)
      this.deleteCandAffecte(cand.id);
      console.log("candidat deleted")
    }
    );
  }

  deleteCandAffecte(idCand: number) {
    this.candidats = this.candidats.filter(candidat => candidat.id !== idCand);
    this.apollo.mutate({
      mutation: removeCandidat,
      variables: {idCand}
    }).subscribe(res => {
      this.toastr.success('Succès', 'Candidat affecté');
      this.router.navigate(['candidats']);

    }, error => {
      this.toastr.error("Affectation impossible!!", 'Erreur');
      console.log("affectation impossible!!")
    });
  }

  upload(event) {
    this.file = event.target.files[0];
    console.log("event:",event.target.files[0]);
  }

  saveFile(){
    this.apollo.mutate({
      mutation: uploadSigleFile,
      variables: {
        upload: this.file
      },
      // context: {
      //   useMultipart: true
      // }
    }).subscribe(({ errors, context, data, extensions }) => {
      console.log("data.upload:",data,errors,context,extensions);
    });
  }

//   async submitForm() {
//     let formData = new FormData();
//     formData.append('photo', this.file, this.file.name);
// ​
//     try {
//       const response = await fetch('http://localhost:3000/photos/upload', {
//         method: 'POST',
//         body: formData,
//       });
// ​
//       if (!response.ok) {
//         throw new Error(response.statusText);
//       }
// ​
//       console.log(response);
//     } catch (err) {
//       console.log(err);
//     }
//   }

  // upload(file){
  //   var operations = {
  //     query: `
  //       mutation($file: Upload!) {
  //         singleUpload(file: $file) {
  //           id
  //         }
  //       }
  //     `,
  //     variables: {
  //       file: null
  //     }
  // }

  // this.apollo.mutate({

  //   mutation: uploadFileMutation,

  //   variables: {
  //     file: this.file
  //   },

  //   context: {
  //     useMultipart: true
  //   }

  // }).subscribe(({ data }) => {

  //   this.response = data.upload

  // });
// }

  // fileChangeEvent(fileInput: any) {
  //   this.filesToUpload = <Array<File>>fileInput.target.files;
  // }
  // }
  // async getCandidatsFormation(selectedDiplome: string){
  //   await this.apollo
  //   .query<any>({
  //       query: searchFormation,
  //       variables: {formation : selectedDiplome},
  //     })
  //     .subscribe(({ data }) => {
  //       this.candidats = [];
  //       this.ids2=[];
  //       this.candidats = data.searchFormation;
  //       this.candidats.forEach(candidat => {
  //         this.ids2.push(candidat.id)
  //       });
  //       console.log("ids2:",this.ids2);
  //       console.log('candidats formation :', this.candidats);
  //     });
  // }

  // async FilterCands(selectedCompetence :string[],selectedDiplome: string){
  //   let variables;
  //   if(selectedCompetence){
  //     await this.getFilterCands(selectedCompetence);
  //     console.log("competences:",selectedCompetence)
  //     console.log("ids1:",this.ids1)
  //   }
  //   if(selectedDiplome){
  //     await this.getCandidatsFormation(selectedDiplome);
  //     console.log("diplome:",selectedDiplome)
  //     console.log("ids2:",this.ids2)
  //   }
  //   if(this.ids1.length==0 && this.ids2.length==0){
  //     variables={};
  //   }
  //   else if(this.ids1.length!==0 && this.ids2.length==0){
  //     variables={ids2: this.ids2};
  //   }
  //   else if(this.ids1.length==0 && this.ids2.length!==0){
  //     variables={ids1: this.ids1};
  //   }
  //   else{
  //     variables= {ids2: this.ids2,ids1: this.ids1}
  //   }
  //   console.log("variables:",variables);
  //   await this.apollo
  //   .query<any>({
  //       query: findPersonnesId,
  //       variables: variables,
  //     })
  //     .subscribe(({ data }) => {
  //       this.candidats = [];
  //       this.candidats = data.findPersonnesId;
  //       console.log('candidats filtrés :', this.candidats);
  //     });
  // }

}
