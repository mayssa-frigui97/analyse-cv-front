import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidats',
  templateUrl: './candidats.component.html',
  styleUrls: ['./candidats.component.css']
})
export class CandidatsComponent implements OnInit {
  public viewInit = false;

  constructor() { }

  ngOnInit(): void {
  }

}
