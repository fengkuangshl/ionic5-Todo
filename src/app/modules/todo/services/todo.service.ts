import { Injectable } from '@angular/core';
import { StorageService } from '../../../services/storage.service';
import { Todo } from '../model/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private key = 'todo-storage'; // 本地存储的key

  constructor(private storageService: StorageService) { }


  /**
   * 获取Todo列表
   */
  getTodoList(): Promise<string> {
    return this.storageService.getStorageList(this.key);
  }
  /**
   * 保存Todo列表
   * @param todos todo列表
   */
  saveTodo(todos: Todo[]): void {
    this.storageService.saveDatas(this.key, todos);
  }

  updateTodo(todo: Todo): Promise<Todo[]> {
    return this.getTodoList().then((qtodo) => {
      let todos = [];
      if (qtodo) {
        todos = JSON.parse(qtodo);
      }
      const newTodo: Todo = todos[todo.id - 1];
      newTodo.completed = todo.completed;
      newTodo.title = todo.title;
      newTodo.description = todo.description;
      newTodo.lastUpdateDate = new Date();
      this.saveTodo(todos);
      return new Promise(resolve => {
        resolve(todos);
      });
    });
  }
}
