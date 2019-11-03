import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AddTodoPage } from '../pages/add-todo/add-todo.page';
import { TodoService } from '../services/todo.service';
import { EventService } from '../../../services/event.service';

import { Todo } from '../model/todo';
@Component({
  selector: 'todo-home',
  templateUrl: './todo-home.component.html',
  styleUrls: ['./todo-home.component.scss'],
})
export class TodoHomeComponent implements OnInit {
  public items: Todo[] = [];
  constructor(public router: Router, public navCtrl: NavController, public modalCtrl: ModalController,
              public todoService: TodoService, public eventService: EventService) {
    this.eventService.event.on('refreshTodoList', () => {
      this.getTodoList();
    });
  }
  getTodoList() {
    this.todoService.getTodoList().then(todos => {
      if (todos) {
          this.items = JSON.parse(todos);
      }
    });
  }
  ngOnInit() {
    this.getTodoList();
  }
  // ionViewWillEnter() {
  //   this.todoService.getTodoList().then(todos => {
  //     if (todos) {
  //         this.items = JSON.parse(todos);
  //     }
  //   });
  // }

  async addItem() {
    const addModal = await this.modalCtrl.create({
      component: AddTodoPage
    });
    await addModal.present();
    const item: any = await addModal.onDidDismiss();
    console.log(item);
    if (item && item.data) {
      if (this.items.length === 0) {
        item.data.id = 1;
      } else {
        item.data.id = this.items[this.items.length - 1].id + 1;
      }
      this.items.push(item.data);
      this.todoService.saveTodo(this.items);
    }
  }

  toggleCompletion(todo: Todo) {
    todo.completed = !todo.completed;
    this.todoService.updateTodo(todo);
  }
  viewItem(todo: Todo) {
    // get传值
    // this.router.navigate(['/todo-detail'], {
    //   queryParams: todo
    // });
    this.router.navigate(['/todo-detail', todo.id]);
  }

  removeTodo(todo: Todo) {
    const index = this.items.indexOf(todo);
    if (index > -1) {
      this.items.splice(index, 1);
      this.todoService.saveTodo(this.items);
    }
  }
}
