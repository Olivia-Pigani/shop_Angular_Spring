import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [

    {
        path:"",
        redirectTo:"homepage",
        pathMatch:"full"
    },
    {
        path:"homepage",
        title:"Home Page",
        component:AppComponent
    }

];
