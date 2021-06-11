import { FurnitureStoreManagementComponent } from './components/furniture-store-management/furniture-store-management.component';
import { FurnitureDetailsComponent } from './components/furniture-details/furniture-details.component';
import { FurnitureListComponent } from './components/furniture-list/furniture-list.component';
import { FurnitureComponent } from './components/furniture/furniture.component';
import { Routes } from '@angular/router';
import { AuthGuard } from './services/guard/auth.guard';

export const furnitureRoutes: Routes = [
    {
        path: "furniture",
        component: FurnitureComponent,
        children: [
            {
                path: "",
                redirectTo: "/furniture/list",
                pathMatch: "full"
            },
            {
                path: "list",
                component: FurnitureListComponent
            },
            {
                path: "store-management",
                canActivate: [AuthGuard],
                component: FurnitureStoreManagementComponent
            },
            {
                path: "edit/:id",
                component: FurnitureStoreManagementComponent
            },
            {
                path: ":id",
                component: FurnitureDetailsComponent
            }
        ]
    },
];