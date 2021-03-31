import { UserRole } from './../Enums/UserRole';
import { Cv } from "./cv";
import { Equipe } from "./equipe";

export class Collaborateur {
    public id:number;

    public tel: number;

    public poste: string;

    public salaire: number;

    public dateEmb: Date;

    public nomUtilisateur: string;

    public motDePasse: string;

    public roles :UserRole[];

    public evaluation: number;

    public equipe :Equipe;

    public notifications?: Notification[];

    public cv :Cv;
}
