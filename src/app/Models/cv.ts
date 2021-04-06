import { Competence } from './competence';
import { ActiviteAssociative } from './activite-associative';
import { Langue } from './langue';
import { Certificat } from './certificat';
import { Experience } from './experience';
import { Formation } from './formation';
import { StatutCV } from './../Enums/StatutCV';
import { Candidat } from './candidat';
export class Cv {

    public id:number;

    public cmptLinkedin:string;

    public cmptGithub:string;

    public description: string;

    public statutCV: StatutCV;

    public candidat :Candidat;

    public formations: Formation[];

    public experiences: Experience[];

    public competences: Competence[];

    public certificats: Certificat[];

    public langues: Langue[];

    public activiteAssociatives: ActiviteAssociative[];
}
