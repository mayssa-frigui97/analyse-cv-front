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
import { CvComponent } from './Components/Commons/cv/cv.component';
import { StarRatingComponent } from './Components/Commons/star-rating/star-rating.component';
import { MultiSelectListComponent } from './Components/Commons/multi-select-list/multi-select-list.component';

import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatExpansionModule} from '@angular/material/expansion';
import { DataTablesModule } from 'angular-datatables';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData, DatePipe } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { CollaborateursPipe } from './Components/Rh/collaborateurs.pipe';
registerLocaleData(localeFr);

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
    MultiSelectListComponent,
    CollaborateursPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    GraphQLModule,
    HttpClientModule,
    // select list
    NgMultiSelectDropDownModule.forRoot(),
    NgSelectModule,

    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    MatPaginatorModule,
    MatExpansionModule,
    DataTablesModule.forRoot()
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR'}, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
