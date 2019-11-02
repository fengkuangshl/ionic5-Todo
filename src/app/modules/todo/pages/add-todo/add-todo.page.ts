import { Component, OnInit } from '@angular/core';
import {Todo} from '../../model/todo';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.page.html',
  styleUrls: ['./add-todo.page.scss'],
})
export class AddTodoPage implements OnInit {

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
  }
  addTodo(todo: Todo) {
    this.modalCtrl.dismiss(todo);
  }
  close() {
    this.modalCtrl.dismiss(null);
  }

}
