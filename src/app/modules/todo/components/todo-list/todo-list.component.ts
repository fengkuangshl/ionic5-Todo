import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { Todo } from '../../model/todo';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {

  @Input() todos: Todo[] = [];
  @Output() toggle = new EventEmitter<Todo>();
  @Output() toViewItem = new EventEmitter<Todo>();
  @Output() deletelTodo = new EventEmitter<Todo>();
  constructor() { }

  ngOnInit() { }

  toggleCompletion(index: number) {
    const todo = this.todos[index];
    this.toggle.emit(todo);

  }
  viewItem(todo: Todo) {
    this.toViewItem.emit(todo);
  }
  removeTodo(todo: Todo) {
    this.deletelTodo.emit(todo);
  }

}
