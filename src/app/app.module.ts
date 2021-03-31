import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CandidatsComponent } from './Components/Rh/candidats/candidats.component';
import { HeaderComponent } from './ComponentsCommons/header/header.component';
import { SidebarComponent } from './ComponentsCommons/sidebar/sidebar.component';
import { FooterComponent } from './ComponentsCommons/footer/footer.component';
import { FicheInfosComponent } from './Components/Collaborateur/fiche-infos/fiche-infos.component';
import { HistoriqueComponent } from './Components/Collaborateur/historique/historique.component';
import { CollaborateursComponent } from './Components/Rh/collaborateurs/collaborateurs.component';
import { LoginComponent } from './ComponentsCommons/login/login.component';
import { UtilisateursComponent } from './Components/Admin/utilisateurs/utilisateurs.component';
import { CollaborateursPoleComponent } from './Components/Rp/collaborateurs-pole/collaborateurs-pole.component';
import { AccueilComponent } from './Components/Rh/accueil/accueil.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    CandidatsComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    FicheInfosComponent,
    HistoriqueComponent,
    CollaborateursComponent,
    LoginComponent,
    UtilisateursComponent,
    CollaborateursPoleComponent,
    AccueilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
