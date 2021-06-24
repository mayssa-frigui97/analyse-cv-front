import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Personne } from 'src/app/Models/personne';
import { findPersonne} from 'src/app/shared/queries/Candidat/query';
import { Location } from '@angular/common';
import { Candidature } from './../../../Models/candidature';

@Component({
  selector: 'app-cv-cand',
  templateUrl: './cv-cand.component.html',
  styleUrls: ['./cv-cand.component.css']
})
export class CvCandComponent implements OnInit {

  candidat: Personne;
  date= "1899-11-29T23:46:24.000Z";

  constructor(private apollo : Apollo,
    private activatedRoute: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.getCand(id);
  }

  getCand(idPersonne: number) {
    this.apollo.query<any>({
      query: findPersonne,
      variables: {idPersonne}
    }).subscribe(({data}) => {
      this.candidat = data.findPersonne;
      console.log("candidat:",this.candidat);
    });
  }

  retour(){
    this.location.back();
  }

}
