import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoHomeComponent } from './todo-home/todo-home.component';
import { TodoListComponent } from '../todo/components/todo-list/todo-list.component';
import { AddTodoPage } from '../todo/pages/add-todo/add-todo.page';
import { InputBoxComponent } from './components/input-box/input-box.component';

@NgModule({
  declarations: [
    TodoHomeComponent,
    TodoListComponent,
    AddTodoPage,
    InputBoxComponent
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ],
  entryComponents: [AddTodoPage]
})
export class TodoModule { }
