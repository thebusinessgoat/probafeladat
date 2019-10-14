import { NgModule } from '@angular/core';
import * as Material from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    Material.MatToolbarModule,
    Material.MatFormFieldModule,
    Material.MatCardModule,
    Material.MatDividerModule,
    Material.MatGridListModule,
    Material.MatFormFieldModule,
    Material.MatIconModule,
    Material.MatInputModule,
    Material.MatButtonModule,
    Material.MatPaginatorModule,
    Material.MatTableModule,
    Material.MatSortModule,
    Material.MatCheckboxModule
  ],
  exports:[
    Material.MatToolbarModule,
    Material.MatFormFieldModule,
    Material.MatCardModule,
    Material.MatDividerModule,
    Material.MatGridListModule,
    Material.MatFormFieldModule,
    Material.MatIconModule,
    Material.MatInputModule,
    Material.MatButtonModule,
    Material.MatPaginatorModule,
    Material.MatTableModule,
    Material.MatSortModule,
    Material.MatCheckboxModule
  ]
})
export class AppMaterialModule { }
