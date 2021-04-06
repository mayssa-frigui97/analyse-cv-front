import { Cv } from './../../../Models/cv';
import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { findCvCandidat } from './../../../shared/Cv/query';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CvComponent implements OnInit {

  cv: Cv;

  constructor(private apollo : Apollo,
    private activatedRoute: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.getCv(id);
    console.log("cv:",this.cv);
  }

  getCv(idCand: number) {
    console.log("tesssssssssssssssssst")
    this.apollo.query<any>({
      query: findCvCandidat,
      variables: {idCand}
    }).subscribe(({data}) => {
      this.cv = data.findCvCandidat;
      console.log("data:",this.cv);
    });
  }

  goBack(): void {
    this.location.back();
  }
}
