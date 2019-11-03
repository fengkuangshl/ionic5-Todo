import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Todo } from '../../model/todo';
import { TodoService } from '../../services/todo.service';
import {  FormBuilder, Validators, FormGroup } from '@angular/forms';
import {  ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { EventService } from '../../../../services/event.service';
@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.page.html',
  styleUrls: ['./todo-detail.page.scss'],
})
export class TodoDetailPage implements OnInit {
  public todo: Todo = new Todo('', '');
  public isEdit = false;
  todoForm: FormGroup;
  formErrors = {
    title: '',
    description: ''
  };

  validationMessages = {
    title: {
      required: 'Email is required.'
    },
    description: {
      required: 'Password is required.'
    }
  };
  constructor(public router: Router, public navCtrl: NavController, public todoService: TodoService, private fb: FormBuilder,
              public activeRoute: ActivatedRoute, public eventService: EventService) {
    this.activeRoute.params.subscribe((params: Params) => {
      this.todoService.getTodoList().then(qtodo => {
        let todos = [];
        if (qtodo) {
          todos = JSON.parse(qtodo);
          todos.forEach(todo => {
            if (todo.id + '' === params.id) {
               this.todo = todo;
               console.log(this.todo);
            }
          });
        }
      });
    });
    this.buildForm();
  }
  ngOnInit() {
  }

  enableEdit(isEdit: boolean) {
    this.isEdit = isEdit;
  }
  public updateTodo() {
    this.todo.completed = false;
    this.isEdit = false;
    this.todoService.updateTodo(this.todo).then(() => {
      this.router.navigate(['/home']).then(() => {
        this.eventService.event.emit('refreshTodoList');
      });
    });
  }

  buildForm(): void {
    this.todoForm = this.fb.group({
      title: ['',   Validators.required],
      description: ['', Validators.required]
    });

    this.todoForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }
  onValueChanged(data?: any) {
    if (!this.todoForm) { return; }
    const form = this.todoForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
}
