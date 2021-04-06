import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableJsComponent } from './js-loader/data-table-js/data-table-js.component';
import { DirectiveDirective } from './js-loader/directive.directive';
import { BaseJsComponent } from './js-loader/base-js/base-js.component';
import { ModalJsComponent } from './js-loader/modal-js/modal-js.component';
import { DashboardJsComponent } from './js-loader/dashboard-js/dashboard-js.component';
import { TranslateModule } from '@ngx-translate/core';

const SharedComponents = [
  DataTableJsComponent,
  DirectiveDirective,
  BaseJsComponent,
  ModalJsComponent,
  DashboardJsComponent
];
@NgModule({
  declarations: [SharedComponents],
  imports: [
    CommonModule
  ],
  exports : [
    SharedComponents
  ]
})
export class SharedModule { }
