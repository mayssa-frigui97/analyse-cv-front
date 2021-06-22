
import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Cv } from 'src/app/Models/cv';
import { ToastrService } from 'ngx-toastr';
import { findFilterCands, findPersonnes, removeCandidat, removePersonne, search, updateRecommande } from 'src/app/shared/queries/Candidat/query';
import { Personne } from '../../../Models/personne';
import { Competence } from 'src/app/Models/competence';
import { findAllCompetences, uploadFile } from 'src/app/shared/queries/Cv/query';
import { createCol, findEquipes, findPoles, findRoles } from 'src/app/shared/queries/Collaborateur/query';
import { Equipe } from '../../../Models/equipe';
import { Pole } from 'src/app/Models/pole';
import { Collaborateur } from '../../../Models/collaborateur';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/Services/auth.service';
import { UserRole } from 'src/app/Enums/UserRole';
import { Subscription } from 'rxjs';


export class Upload {

  filename: String;

  mimetype: string;

  encoding: String;

  // createReadStream :() => Stream;

}
const uri = 'http://localhost:2000/graphql';

// export const schema = makeExecutableSchema({ typeDefs, resolvers })

@Component({
  selector: 'app-candidats',
  templateUrl: './candidats.component.html',
  styleUrls: ['./candidats.component.css']
})
export class CandidatsComponent implements OnInit {

  public file: File = null;
  public fileupload= new Upload();
  public userRole: string;
  public equipe : number;
  public pole: number;
  public candidats: Personne[];
  myUser: Personne;
  marked : boolean;
  public test: boolean;
  public cvs: Cv[];
  equipes :Equipe[];
  poles: Pole[];
  public competences: Competence[]=[];
  public subscription : Subscription;

  selectedComp: string[];
  selectedPole: string;
  selectedTL: string;
  searchWord: string;
  roles: Collaborateur[];
  dtOptions: DataTables.Settings = {};

  constructor(
    private apollo: Apollo,
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient,
    private auth: AuthService
    ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu : [5, 10, 25],
      processing: true
    }
    this.userRole=this.auth.getRole();
    if(this.userRole==UserRole.RP){
      this.pole=this.auth.getPole();
    }
    else if(this.userRole==UserRole.TEAMLEADER){
      this.equipe=this.auth.getEquipe();
    }
    this.getCompetences();
    this.getEquipes();
    this.getPoles();
    this.getRoles();
    if(!this.candidats){
      console.log("*".repeat(10));
      this.getAllCandidats();}
  }

  async resolve(parent, { image }) {
    const { filename, mimetype, createReadStream } = await image;
    const stream = createReadStream();
    // Promisify the stream and store the file, then…
    return true;
  }

  getAllCandidats() {
    console.log("test".repeat(3))
    if(!this.candidats){
    this.subscription= this.apollo.watchQuery<any>({
      query: findPersonnes,
    })
      .valueChanges
      .pipe(
        map(result => result.data.findPersonnes)
      ).subscribe(data => {
      this.candidats = data;
      console.log("allcandidats :",this.candidats);
      this.subscription.unsubscribe();
    });}
    else{console.log("-".repeat(10))}
  }

  getFilterCands(selectedComp?: string[]) {
    let variables;
    if(selectedComp.length==0){
      variables={};
    }
    else{
      variables={selectedComp};
    }
    this.subscription=this.apollo
    .query<any>({
        query: findFilterCands,
        variables: variables,
      })
      .subscribe(({data} ) => {
        // this.candidats = [];
        this.candidats=data.findFilterCands;
        if(data == 0){
          this.test = true;
          // console.log("test",this.test,this.candidats.length)
        }
        else{
          this.test = false;
          // console.log("test",this.test,this.candidats.length)
        }
        console.log('candidats apres filter1:',this.candidats)
        this.subscription.unsubscribe();
      });
      console.log("+".repeat(20))
      console.log('candidats apres filter2:',this.candidats)
    }

  changeRecommande(e,idPersonne: number){
    if (e.target.checked) {
      this.marked=true;}
    else{
      this.marked=false;}
    console.log("recommande:",this.marked)
    this.subscription=this.apollo.mutate({
      mutation: updateRecommande,
      variables: {idPersonne,value: this.marked}
    })
      .subscribe(({data}:any) => {
        console.log("data:",data);
        // this.candidats = [];
        console.log("candidats:",this.candidats);
        // this.getCandidats();
        console.log("candidats nv:",this.candidats);
        this.subscription.unsubscribe();
    });
  }


  deleteCand(idPersonne: number) {
    console.log("myUser:",this.myUser);
    this.candidats = this.candidats.filter(candidat => candidat.id !== idPersonne);
    this.subscription=this.apollo.mutate({
      mutation: removePersonne,
      variables: {idPersonne}
    }).subscribe(res => {
      this.toastr.success('Succès', 'Candidat supprimé');
      this.router.navigate(['candidats']);
    }, error => {
      this.toastr.error("suppression impossible!!", 'Erreur');
      console.log("suppression impossible!!")
      this.subscription.unsubscribe();
    });
  }

  search(searchWord: string) {
    console.log("searchWord:",searchWord);
    if(searchWord){
      this.subscription=this.apollo
      .query<any>({
        query: search,
        variables: {mot: searchWord},
      })
      .subscribe(({ data }) => {
        // this.candidats = [];
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
        this.subscription.unsubscribe();
      });
    }
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
      role: formulaire.role,
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
    // this.fileupload.filename=this.file.name;
    // this.fileupload.mimetype='text/plain';
    // this.fileupload.encoding='utf-8';
    var operations = {
      query: `
        mutation($file: Upload!) {
          UploadFile(file: $file) {
          }
        }
      `,
      variables: {
        file: null
      }
    }
    var _map = {
      file: ["variables.file"]
    }
    var fd = new FormData()
    fd.append('operations', JSON.stringify(operations))
    fd.append('map', JSON.stringify(_map))
    fd.append('0', this.file, this.file.name)
    this.http.post(uri, fd).subscribe();
    // return await request(uri, post, fd, {
    //   headers: { "Content-Type": "multipart/form-data" },
    // });
  }

  saveFile(){
    // let upload :Upload=null;
    console.log("this.file",this.fileupload)
    let variable={file:this.fileupload};
    // upload.filename=this.file.name;
    console.log("upload:",variable);
    // this.apollo.mutate({
    //   mutation: uploadFile,
    //   variables: variable,
    //   // context: {
    //   //   useMultipart: true
    //   // }
    // }).subscribe(({ data}) => {
    //   console.log("data.upload:",data);
    // });
  }

}
