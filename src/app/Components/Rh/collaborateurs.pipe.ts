import { Pipe, PipeTransform } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Pole } from 'src/app/Models/pole';

@Pipe({
  name: 'getNom',
  pure: true
})
export class CollaborateursPipe implements PipeTransform {

  public poleRp: string;
  public poles: Pole[];
  constructor(private apollo: Apollo){}

  transform(id: number,poles: Pole[], args?: any): any {
    return this.getNom(id,poles);
  }

  getNom(id: number, poles: Pole[]): string{
    for(var pole of poles){
      if(pole.rp.id === id)
      {
        console.log("pole:",pole.nom,"de rp:",id)
        return pole.nom;
      }
    }
  }
}
