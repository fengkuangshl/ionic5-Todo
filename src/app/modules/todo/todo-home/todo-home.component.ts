import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AddTodoPage } from '../pages/add-todo/add-todo.page';

import {Todo} from '../model/todo';
@Component({
  selector: 'todo-home',
  templateUrl: './todo-home.component.html',
  styleUrls: ['./todo-home.component.scss'],
})
export class TodoHomeComponent implements OnInit {
  public items: Todo[] = [];
  constructor(public router: Router, public navCtrl: NavController, public modalCtrl: ModalController) {
    for (let i = 0 ; i < 10; i++) {
      const todo: Todo =  new Todo(i + '', 'this todo title' + i);
      this.items.push(todo);
    }
  }

  ngOnInit() {}

  async addItem() {
    const addModal = await this.modalCtrl.create({
      component: AddTodoPage
    });
    // addModal.onDidDismiss((item) => {
    //   if (item) {
    //     this.addTodo(item);
    //   }
    // });
    // const item: any = await addModal.onWillDismiss();
    // if (item) {
    //   this.addTodo(item);
    // }
    return addModal.present();
  }

}
