import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { PageErrorComponent } from './utils/page-error/page-error.component';
import { HomepageComponent } from './homepage/homepage.component';

export const routes: Routes = [

    {
        path:"",
        redirectTo:"homepage",
        pathMatch:"full"
    },
    {
        path:"homepage",
        title:"Home Page",
        component:HomepageComponent,
    },
    {
        path:"details/:id",
        title: "Product details",
        component: ProductDetailsComponent
    },
    {
        path:"**",
        component:PageErrorComponent
    }

];
