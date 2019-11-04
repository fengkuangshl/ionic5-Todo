import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AddTodoPage } from '../add-todo/add-todo.page';
import { TodoService } from '../../services/todo.service';
import { EventService } from '../../../../services/event.service';

import { Todo } from '../../model/todo';

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
          const  ts = JSON.parse(todos);
          ts.sort((a: Todo, b: Todo) => {
            if (a.completed < b.completed) {
                return -1;
            }
            if (a.completed === b.completed) {
              if (a.createDate > b.createDate) {
                return -1;
              } else {
                return 1;
              }
            }
            return 0;

          });
          this.items = ts;
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

  guid2() {
    function S4() {
        // tslint:disable-next-line:no-bitwise
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
  }

  async addItem() {
    const addModal = await this.modalCtrl.create({
      component: AddTodoPage
    });
    await addModal.present();
    const item: any = await addModal.onDidDismiss();
    console.log(item);
    if (item && item.data) {
      // if (this.items.length === 0) {
      //   item.data.id = 1;
      // } else {
      //   item.data.id = this.items[this.items.length - 1].id + 1;
      // }
      item.data.id = this.guid2();
      this.items.push(item.data);
      this.todoService.saveTodo(this.items).then(() => {
        this.getTodoList();
      });
    }
  }

  toggleCompletion(todo: Todo) {
    todo.completed = !todo.completed;
    this.todoService.updateTodo(todo).then(() => {
      this.getTodoList();
    });
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
