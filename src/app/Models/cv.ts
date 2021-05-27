import { StatutCV } from './../Enums/StatutCV';
import { Personne } from './personne';
export class Cv {

    public id:number;

    public cmptLinkedin?:string;

    public statutCV: StatutCV;

    public activiteAssociatives?:string;

    public certificats?:string;

    public competences: string[];

    public langues: string[];

    public experiences?: string;

    public formations?: string;

    public projets?: string;

    public interets?: string;

    public personne :Personne;
}
