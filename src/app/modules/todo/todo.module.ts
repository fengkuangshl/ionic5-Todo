import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoHomeComponent } from './pages/todo-home/todo-home.component';
import { TodoListComponent } from '../todo/components/todo-list/todo-list.component';
import { AddTodoPage } from '../todo/pages/add-todo/add-todo.page';
import { InputBoxComponent } from './components/input-box/input-box.component';
import { ContentSubstringPipe } from '../../pipes/content-substring.pipe';
import { DatePipe } from '../../pipes/date.pipe';
import {TodoDetailPage} from './pages/todo-detail/todo-detail.page';

@NgModule({
  declarations: [
    TodoHomeComponent,
    TodoListComponent,
    AddTodoPage,
    InputBoxComponent,
    ContentSubstringPipe,
    DatePipe,
    TodoDetailPage
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
