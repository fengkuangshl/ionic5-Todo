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
  saveDatas(key: string, datas: any[]): Promise<any> {
    const newData = JSON.stringify(datas);
    return this.storage.set(key, newData);
  }

  saveData(key: string, data: any): Promise<any> {
    const newData = JSON.stringify(data);
    return  this.storage.set(key, newData);
  }
  removeData(key: string): Promise<any> {
    return this.storage.remove(key);
  }
}
