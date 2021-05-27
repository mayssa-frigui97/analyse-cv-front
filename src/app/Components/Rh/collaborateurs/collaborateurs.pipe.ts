import { Pipe, PipeTransform } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Pole } from 'src/app/Models/pole';

@Pipe({
  name: 'getPole',
  pure: true
})
export class CollaborateursPipe implements PipeTransform {

  public poleRp: string;
  public poles: Pole[];
  constructor(private apollo: Apollo){}

  transform(id: number,poles: Pole[], args?: any): any {
    return this.getPole(id,poles);
  }

  getPole(id: number, poles: Pole[]): string{
    for(var pole of poles){
      if(pole.rp.id === id)
      {
        console.log("pole:",pole.nom,"de rp:",id)
        return pole.nom;
      }
    }
  }
}
