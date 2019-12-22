import { Injectable } from '@angular/core';
import { StorageService } from './../../../services/storage.service';
import { User } from '../model/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public key = 'user-storage'; // 本地存储的key

  public loginUser  = 'user-login';

  constructor(public storage: StorageService) {
    console.log('This Storage Provider');
  }
  /**
   * 获取User列表
   */
  getUserList(): Promise<any> {
    return this.storage.getStorageList(this.key);
  }
  /**
   * 保存User列表
   * @param Users User列表
   */
  saveUser(users: User[]): void {
    this.storage.saveDatas(this.key, users);
  }

  getLoginUser(): Promise<any> {
    return this.storage.getStorageList(this.loginUser);
  }

  saveLoginUser(user: User): Promise<any> {
    return this.storage.saveData(this.loginUser, user);
  }

  login(user: User): Promise<any> {
   return this.getUserList().then((users) => {
      let currentUser = null;
      if (users) {
        users = JSON.parse(users);
        users.forEach(( userdb: User) => {
          if (userdb.email === user.email && userdb.password === user.password) {
            if (userdb.isAutoLogin) {
              this.saveLoginUser(userdb);
            }
            currentUser = userdb;
          }
        });
      } else {
      }
      return currentUser;
    });
  }

  loginOut(): Promise<any> {
    // this.storage.removeData(this.loginUser);
    return this.getLoginUser().then((user: string) => {
      const u: User = JSON.parse(user);
      u.isAutoLogin = false;
      this.saveLoginUser(u);
      return u;
    });
  }
}
