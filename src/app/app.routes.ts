import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NewThreadComponent } from './components/threads/new-thread/new-thread.component';
import { ThreadsComponent } from './components/threads/threads.component';
import { NewPostComponent } from './components/posts/new-post/new-post.component';
import { PostViewComponent } from './components/posts/post-view/post-view.component';

// include route names in 'path' and their respective component in 'component'
export const routes: Routes = [
    { path: 'register', component: RegisterComponent},
    { path: 'login', component: LoginComponent},
    { path: 'home', component: HomeComponent },
    { path: 'thread-new', component: NewThreadComponent },
    { path: 'thread/:id', component: ThreadsComponent },
    { path: 'post-new/:id', component: NewPostComponent },
    { path: 'thread/:id/:idPost', component: PostViewComponent },
    {
        path: 'api/user',
        redirectTo: '/api/user',
        pathMatch: 'full'
    },
    {
        path: '',
        component: LoginComponent,
        pathMatch: 'full'
    },
    // { path: '**', component: NotFoundComponent }

];
