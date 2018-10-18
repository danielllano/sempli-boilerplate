import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { LoaderComponent } from './loader/loader.component';
import { CardStatsComponent } from './card-stats/card-stats.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from '@app/core/custom-mat-paginator-intl';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    MatTableModule,
    MatExpansionModule,
    MatPaginatorModule
  ],
  declarations: [
    LoaderComponent,
    CardStatsComponent
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: CustomMatPaginatorIntl
    }
  ],
  exports: [
    LoaderComponent,
    CardStatsComponent,
    MatTableModule,
    MatExpansionModule,
    MatPaginatorModule
  ]
})
export class SharedModule { }
