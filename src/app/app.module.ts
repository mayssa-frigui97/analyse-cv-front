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
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { CvComponent } from './Components/Commons/cv/cv.component';
import { StarRatingComponent } from './Components/Commons/star-rating/star-rating.component';
import { MultiSelectListComponent } from './Components/Commons/multi-select-list/multi-select-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgSelectModule } from '@ng-select/ng-select';

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
    AccueilComponent,
    CvComponent,
    StarRatingComponent,
    MultiSelectListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    GraphQLModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'fr'
  }),
    // select list
    BrowserAnimationsModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    MatToolbarModule,
    MatIconModule,
    MatSlideToggleModule,

    NgMultiSelectDropDownModule.forRoot(),
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
