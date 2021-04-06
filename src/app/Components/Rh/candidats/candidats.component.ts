import { Candidat} from './../../../Models/candidat';
import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'
import { findCandidats } from 'src/app/shared/Candidat';

@Component({
  selector: 'app-candidats',
  templateUrl: './candidats.component.html',
  styleUrls: ['./candidats.component.css']
})
export class CandidatsComponent implements OnInit {
  candidats: Candidat[];


  // candidats: Observable<Candidat[]>;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.getCandidats();
  }

  getCandidats() {
    this.apollo.watchQuery<any>({
      query: findCandidats,
    })
      .valueChanges
      .pipe(
        map(result => result.data.findCandidats)
      ).subscribe(data => {
      this.candidats = data;
      console.log("candidats :",this.candidats);
    });

  }

}
