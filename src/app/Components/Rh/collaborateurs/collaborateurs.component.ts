import { Observable } from 'rxjs';
import { Collaborateur } from './../../../Models/collaborateur';
import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { findCols, findEquipes, findPoles } from 'src/app/shared/Collaborateur/query';
import { map } from 'rxjs/operators';
import { Equipe } from './../../../Models/equipe';
import { Pole } from './../../../Models/pole';

@Component({
  selector: 'app-collaborateurs',
  templateUrl: './collaborateurs.component.html',
  styleUrls: ['./collaborateurs.component.css']
})
export class CollaborateursComponent implements OnInit {

  public cols: Observable<Collaborateur[]>;
  public equipes: Equipe[];
  public poles: Pole[];
  projets=[
    {id: 1, nom: 'Application mobile Amen Bank'},
    {id: 2, nom: 'Application mobile BTK Bank'},
    {id: 3, nom: 'Application web Amen Bank'},
    {id: 4, nom: 'Application web BTK Bank'}
  ];
  selected = [];

  constructor(private apollo: Apollo){}


  ngOnInit(): void {
    this.getCols();
    this.getEquipes();
    this.getPoles();
  }

  getCols() {
    this.apollo.watchQuery<any>({
      query: findCols,
    })
      .valueChanges
      .pipe(
        map(result => result.data.findCols)
      ).subscribe(data => {
      this.cols = data;
    });
    console.log("cols :",this.cols);
  }

  getPoles() {
    this.apollo.watchQuery<any>({
      query: findPoles,
    })
      .valueChanges
      .pipe(
        map(result => result.data.findPoles)
      ).subscribe(data => {
      this.poles = data;
    });
    console.log("Poles :",this.poles);
  }

  getEquipes() {
    this.apollo.watchQuery<any>({
      query: findEquipes,
    })
      .valueChanges
      .pipe(
        map(result => result.data.findEquipes)
      ).subscribe(data => {
      this.equipes = data;
    });
    console.log("Equipes :",this.equipes);
  }




}
