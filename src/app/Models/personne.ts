import { Candidature } from './candidature';
import { Cv } from './cv';
export class Personne {

    public id:number;

    public nom:string;

    public prenom:string;

    public cin: number;

    public dateNaiss:Date;

    public adresse: string;

    public tel: number;

    public email: string;

    public avatar: string;

    public cv: Cv;

    public candidatures: Candidature[];
}

