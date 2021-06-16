import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CandidatsComponent } from './Components/list/candidats/candidats.component';
import { HeaderComponent } from './ComponentsCommons/header/header.component';
import { SidebarComponent } from './ComponentsCommons/sidebar/sidebar.component';
import { FooterComponent } from './ComponentsCommons/footer/footer.component';
import { FicheInfosComponent } from './Components/Collaborateur/fiche-infos/fiche-infos.component';
import { HistoriqueComponent } from './Components/Collaborateur/historique/historique.component';
import { CollaborateursComponent } from './Components/list/collaborateurs/collaborateurs.component';
import { LoginComponent } from './Components/login/login.component';
import { UtilisateursComponent } from './Components/list/utilisateurs/utilisateurs.component';
import { AccueilComponent } from './Components/accueil/accueil.component';
import { SharedModule } from './shared/shared.module';
import { CvColComponent } from './Components/cv/cv-col/cv-col.component';

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
import { CollaborateursPipe } from './Components/list/collaborateurs/collaborateurs.pipe';
import { ToastrModule } from 'ngx-toastr';
import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkTableModule } from '@angular/cdk/table';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AlertComponent } from './ComponentsCommons/alert/alert.component';
import { CvCandComponent } from './Components/cv/cv-cand/cv-cand.component';
import { StarRatingComponent } from './ComponentsCommons/star-rating/star-rating.component';
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
    AccueilComponent,
    CvColComponent,
    StarRatingComponent,
    CollaborateursPipe,
    AlertComponent,
    CvCandComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    GraphQLModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    // select list
    NgMultiSelectDropDownModule.forRoot(),
    NgSelectModule,

    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    MatPaginatorModule,
    MatExpansionModule,
    A11yModule,
    MatExpansionModule,
    MatInputModule,
    MatNativeDateModule,
    MatRippleModule,
    MatSelectModule,
    MatSortModule,
    MatTooltipModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
    CdkTableModule,
    DataTablesModule,

    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-center',
    })

  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR'}, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
