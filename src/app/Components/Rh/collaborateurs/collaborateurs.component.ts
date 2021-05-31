import { Collaborateur } from './../../../Models/collaborateur';
import { ChangeDetectorRef, Component, OnInit, ViewChild, AfterViewInit, Pipe } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { findCols, findEquipes, findEquipesPole,  findFilterCols,  findPoles, findPostes, removeCol } from 'src/app/shared/Collaborateur/query';
import { map } from 'rxjs/operators';
import { Equipe } from './../../../Models/equipe';
import { Pole } from './../../../Models/pole';
import { Subject } from 'rxjs';
import { DataTableDirective,DataTablesModule } from 'angular-datatables';
import { Cv } from 'src/app/Models/cv';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { findAllCompetences} from 'src/app/shared/Cv/query';
// import * as jquery from 'jquery';
// import 'datatables.net';
// import 'datatables.net-bs4';
import { Competence } from './../../../Models/competence';


@Component({
  selector: 'app-collaborateurs',
  templateUrl: './collaborateurs.component.html',
  styleUrls: ['./collaborateurs.component.css'],
})
export class CollaborateursComponent implements OnInit, AfterViewInit{
  public cols: Collaborateur[];
  public equipes: Equipe[];
  public postes: Collaborateur[];
  public poles: Pole[];
  public rpId: number;
  // public universites: Formation[];
  // public specialites: Formation[];
  // public nivFormation: Formation[];
  public cvs: Cv[];
  public annees: number[];
  public competences: Competence[];
  public myUser: Collaborateur;
  public test : boolean;

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

  // @ViewChild(DataTableDirective)
  // dtElement: DataTableDirective;
  // dtOptions: DataTables.Settings = {};
  // dtInstance:Promise<DataTables.Api>;
  // dtTrigger: Subject<any> = new Subject();

  displayedColumns: string[] = ['nom', 'email', 'tel', 'poste','salaire','dateEmb','evaluation'];
  dataSource: MatTableDataSource<Collaborateur>;

  // @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  constructor(
    private apollo: Apollo,
    private router: Router,
    private toastr: ToastrService
    // private changeDetectorRefs: ChangeDetectorRef
    ) {

    }

    ngOnInit(): void {
    this.getCompetences();
    this.getCols();
    this.getEquipes();
    this.getPoles();
    // this.getUniversites();
    // this.getNivForm();
    // this.getSpecialites();
    this.getPostes();
  }

  async getCols() {
    await this.apollo
      .watchQuery<any>({
        query: findCols,
      })
      .valueChanges.pipe(map((result) => result.data.findCols))
      .subscribe((data) => {
        this.cols = data;
        this.dataSource = new MatTableDataSource(this.cols);
        // this.dataSource.paginator = this.paginator;
        console.log('cols :', this.cols);
        console.log("dataSource:",this.dataSource.data);
      });
  }

  getFilterCols(selectedPoles: number[],selectedEquipes: number[],
    selectedComp?: string[], selectedPoste?: string[]) {
    // console.log("selectedPole:",selectedPoles)
    // console.log("selectedEquipes:",selectedEquipes)
    console.log("selectedComp:",selectedComp)
    // console.log("selectedPoste:",selectedPoste)
    this.apollo
      .query<any>({
        query: findFilterCols,
        variables: { selectedPoles, selectedEquipes, selectedComp, selectedPoste}
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
        this.dataSource = new MatTableDataSource(this.cols);
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

  getPostes(){
    this.apollo
      .watchQuery<any>({
        query: findPostes,
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

  deleteUser(idCol: number) {
    console.log("myUser:",this.myUser);
    this.cols = this.cols.filter(col => col.id !== idCol);
    // const deletedUser = this.candidats.filter(candidat => candidat.id === idCand)[0];
    // if (confirm('Are you sure to delete this user?')) {
    this.apollo.mutate({
      mutation: removeCol,
      variables: {idCol}
    }).subscribe(res => {
      this.toastr.success('Good', 'Collaborateur supprimé');
      this.router.navigate(['collaborateurs']);
      // this.rerender({newData: deletedUser, deleteOper: true});

    }, error => {
      this.toastr.error("suppression impossible!!", 'Error');
      console.log("suppression impossible!!")
    });
    // }
  }

  //n 'est pas utilisée : non fonctionnelle
  // rerender({ newData, filterOper = false }): void {
  //   console.log("dtelement:",this.dtElement)
  //   if (this.dtElement.dtInstance) {
  //     this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //       // Destroy the table first
  //       dtInstance.destroy();

  //       // Remove old data
  //       this.cols = this.cols.filter((val) => val.id !== newData.id);

  //       // Only if it isn't a delete operation
  //       if (!filterOper) {
  //         this.cols.push(newData);
  //       }
  //       // Call the dtTrigger to rerender again
  //       this.dtTrigger.next();
  //     });
  //   } else {
  //     this.dtTrigger.next();
  //   }
  // }

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
}


