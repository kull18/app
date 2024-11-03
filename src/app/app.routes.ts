import { Routes } from '@angular/router';
import { HomeComponent } from './auth/home/home.component';
import { LoginComponent } from './auth/home/components/login/login.component';
import { InfoComponent } from './auth/home/components/info/info.component';
import { RegisterComponent } from './auth/home/components/register/register.component';
//no hice ningun modulo 
export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'info',
        component: InfoComponent
    },
    {
        path: 'Register',
        component: RegisterComponent,
    },
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(a => a.AdminModule)
    }
];
