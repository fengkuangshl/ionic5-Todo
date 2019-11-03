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
  saveTodo(todos: Todo[]): Promise<Todo[]> {
    return this.storageService.saveDatas(this.key, todos).then(() => {
      return new Promise(resolve => {
        resolve(todos);
      });
    });
  }

  updateTodo(todo: Todo): Promise<Todo[]> {
    return this.getTodoList().then((qtodo) => {
      let todos = [];
      if (qtodo) {
        todos = JSON.parse(qtodo);
      }
      todos.forEach(t => {
        if (todo.id === t.id) {
          t.completed = todo.completed;
          t.title = todo.title;
          t.description = todo.description;
          t.lastUpdateDate = new Date();
        }
      });
      this.saveTodo(todos);
      return new Promise(resolve => {
        resolve(todos);
      });
    });
  }
}
