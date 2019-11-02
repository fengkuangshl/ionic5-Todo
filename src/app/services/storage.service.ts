import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(public storage: Storage) {
  }
  /**
   * 获取Todo列表
   */
  getStorageList(key: string): Promise<string> {
    return this.storage.get(key);
  }
  /**
   * 保存Todo列表
   * @param todos todo列表
   */
  saveDatas(key: string, datas: any[]): void {
    const newData = JSON.stringify(datas);
    this.storage.set(key, newData);
  }

  saveData(key: string, data: any): void {
    const newData = JSON.stringify(data);
    this.storage.set(key, newData);
  }
  removeData(key: string): void {
    this.storage.remove(key);
  }
}
