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

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: '', component: AccueilComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'accueil', component:AccueilComponent},
  { path: 'ficheInfos', component:FicheInfosComponent},
  { path: 'historique', component:HistoriqueComponent},
  { path: 'candidats', component:CandidatsComponent},
  { path: 'candidats/cv/:id', component: CvCandComponent},
  { path: 'collaborateurs', component:CollaborateursComponent},
  { path: 'collaborateurs/cv/:id', component: CvColComponent},
  { path: 'utilisateurs', component:UtilisateursComponent},
  { path: 'utilisateurs/cv/:id', component: CvColComponent},

  // { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
