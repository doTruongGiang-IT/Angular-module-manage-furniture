import { furnitureRoutes } from './furniture.routes';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FurnitureComponent } from './components/furniture/furniture.component';
import { FurnitureListComponent } from './components/furniture-list/furniture-list.component';
import { FurnitureDetailsComponent } from './components/furniture-details/furniture-details.component';
import { RouterModule } from '@angular/router';
import { FormatDataPipe } from './pipes/format-data/format-data.pipe';
import { FurnitureStoreManagementComponent } from './components/furniture-store-management/furniture-store-management.component';


@NgModule({
  declarations: [
    FurnitureComponent,
    FurnitureListComponent,
    FurnitureDetailsComponent,
    FormatDataPipe,
    FurnitureStoreManagementComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(furnitureRoutes)
  ],
  providers: [],
  bootstrap: [FurnitureComponent]
})
export class ManageFurnitureModule { }
