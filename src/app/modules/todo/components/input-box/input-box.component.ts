import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {Todo} from '../../model/todo';

@Component({
  selector: 'input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.scss'],
})
export class InputBoxComponent implements OnInit {

  @Input() titlePlaceholder: string;              // title提示信息
  @Input() descriptionPlaceholder: string;        // description提示信息
  @Input() buttonLabel: string;                   // 提交按钮的文体提示
  @Output() inputText = new EventEmitter<Todo>(); // 输入内容的输入出

  todoForm: FormGroup;

  formErrors = {
    title: '',
    description: ''
  };

  validationMessages = {
    title: {
      required: 'title is required.'
    },
    description: {
      required: 'description is required.'
    }
  };

  constructor(public fb: FormBuilder) {
    this.buildForm();
   }

  ngOnInit() {}

  emitText() {
    const todo: Todo = new Todo(this.todoForm.value.title, this.todoForm.value.description);
    this.inputText.emit(todo);
  }

  buildForm(): void {
    this.todoForm = this.fb.group({
      title: ['',   Validators.required],
      description : ['', Validators.required]
    });

    this.todoForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }
  onValueChanged(data?: any) {
    if (!this.todoForm) { return; }
    const form = this.todoForm;
    for (const  field in this.formErrors) {
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
