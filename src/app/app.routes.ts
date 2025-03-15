import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';

// include route names in 'path' and their respective component in 'component'
export const routes: Routes = [
    { path: 'register', component: RegisterComponent},
    // { path: 'register', component: RegisterComponent },
    // { path: 'login', component: LoginComponent},
    // { path: 'profile', component: ProfileComponent},
    
    // { path: 'home', component: HomeComponent },
    // { path: '**', component: NotFoundComponent }
    {
        path: 'api/user',
        redirectTo: '/api/user',
        pathMatch: 'full'
    },
    {
        path: '',
        redirectTo: 'register',
        pathMatch: 'full'
    },

];
