import { CvColComponent } from './Components/Rh/cv-col/cv-col.component';
import { AccueilComponent } from './Components/Rh/accueil/accueil.component';
import { UtilisateursComponent } from './Components/Admin/utilisateurs/utilisateurs.component';
import { CandidatsComponent } from './Components/Rh/candidats/candidats.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoriqueComponent } from './Components/Collaborateur/historique/historique.component';
import { FicheInfosComponent } from './Components/Collaborateur/fiche-infos/fiche-infos.component';
import { CollaborateursComponent } from './Components/Rh/collaborateurs/collaborateurs.component';
import { LoginComponent } from './ComponentsCommons/login/login.component';
import { AuthGuard } from './Services/auth-guard.service';
import { CvCandComponent } from './Components/Rh/cv-cand/cv-cand.component';
import { UserRole } from './Enums/UserRole';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: '', component: AccueilComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'accueil', component:AccueilComponent,canActivate: [AuthGuard],data: { allowedRoles: [UserRole.COLLABORATEUR, UserRole.RH, UserRole.RP, UserRole.TEAMLEADER]}},
  { path: 'ficheInfos', component:FicheInfosComponent,canActivate: [AuthGuard],data: { allowedRoles: [UserRole.COLLABORATEUR, UserRole.RH, UserRole.RP, UserRole.TEAMLEADER]} },
  { path: 'historique', component:HistoriqueComponent,canActivate: [AuthGuard],data: { allowedRoles: [UserRole.COLLABORATEUR, UserRole.RH, UserRole.RP, UserRole.TEAMLEADER]}},
  { path: 'candidats', component:CandidatsComponent,canActivate: [AuthGuard],data: { allowedRoles: [UserRole.RH, UserRole.RP, UserRole.TEAMLEADER]}},
  { path: 'candidats/cv/:id', component: CvCandComponent,canActivate: [AuthGuard],data: { allowedRoles: [UserRole.RH, UserRole.RP, UserRole.TEAMLEADER]}},
  { path: 'collaborateurs', component:CollaborateursComponent,canActivate: [AuthGuard],data: { allowedRoles: [UserRole.RH, UserRole.RP, UserRole.TEAMLEADER]}},
  { path: 'collaborateurs/cv/:id', component: CvColComponent,canActivate: [AuthGuard],data: { allowedRoles: [UserRole.RH, UserRole.RP, UserRole.TEAMLEADER]}},
  { path: 'utilisateurs', component:UtilisateursComponent,canActivate: [AuthGuard],data: { allowedRoles: [UserRole.RH]}},
  { path: 'utilisateurs/cv/:id', component: CvColComponent,canActivate: [AuthGuard],data: { allowedRoles: [UserRole.RH]}},

  // { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
