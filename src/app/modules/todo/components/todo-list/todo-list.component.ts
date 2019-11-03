import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

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
  constructor(public alertController: AlertController) { }

  ngOnInit() { }

  toggleCompletion(index: number) {
    const todo = this.todos[index];
    this.toggle.emit(todo);

  }
  viewItem(todo: Todo) {
    this.toViewItem.emit(todo);
  }
  async removeTodo(todo: Todo) {
    const alert = await this.alertController.create({
      header: '请确认!',
      message: '确认要删除' + todo.title + '吗？',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: delete');
          }
        }, {
          text: '确定',
          handler: () => {
            this.deletelTodo.emit(todo);
          }
        }
      ]
    });
    await alert.present();
  }

}
