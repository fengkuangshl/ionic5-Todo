import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoHomeComponent } from './todo-home/todo-home.component';

const routes: Routes = [
  {path: '' , component: TodoHomeComponent}
  // { path: 'add-todo', loadChildren: './pages/add-todo/add-todo.module#AddTodoPageModule' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }
