import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [],
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    MatInputModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  exports: [
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    MatInputModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class NgMaterialModule { }
