import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TodoModule } from './modules/todo/todo.module';
import {AuthenticationGuard} from './guard/authentication.guard';

const routes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./modules/todo/todo.module').then( m => m.TodoModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'user',
    loadChildren: () => import('./modules/user/user.module').then( m => m.UserModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule, TodoModule]
})
export class AppRoutingModule { }
