import { CvComponent } from './Components/Commons/cv/cv.component';
import { AccueilComponent } from './Components/Rh/accueil/accueil.component';
import { UtilisateursComponent } from './Components/Admin/utilisateurs/utilisateurs.component';
import { CandidatsComponent } from './Components/Rh/candidats/candidats.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoriqueComponent } from './Components/Collaborateur/historique/historique.component';
import { FicheInfosComponent } from './Components/Collaborateur/fiche-infos/fiche-infos.component';
import { CollaborateursComponent } from './Components/Rh/collaborateurs/collaborateurs.component';
import { LoginComponent } from './ComponentsCommons/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: 'signin', component: AccueilComponent},
  { path: 'signout', component: LoginComponent},
  { path: 'accueil', component:AccueilComponent},
  { path: 'candidats', component:CandidatsComponent},
  { path: 'candidats/cv/:id', component: CvComponent},
  { path: 'collaborateurs', component:CollaborateursComponent},
  { path: 'collaborateurs/cv/:id', component: CvComponent},
  { path: 'utilisateurs', component:UtilisateursComponent},
  { path: 'utilisateurs/cv/:id', component: CvComponent},
  { path: 'ficheInfos', component:FicheInfosComponent},
  { path: 'historique', component:HistoriqueComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
