import {Gender} from '../enums/gender';
/**
 * Todo model
 */
export class User {
    id: number;
    email: string;
    name: string;   // name
    password: string; // password
    confirmPassword: string;
    gesturePassword: string;
    isEnableGesturePassword: boolean;
    gender: Gender;
    brithday: Date;
    createDate: Date = new Date(); // 创建时间
    lastUpdateDate: Date = new Date(); // 更新时间
    isAutoLogin = true;
    errorGestureLoginCount = 0;
    errorLoginCount = 0;

    constructor( name: string, password: string) {
        this.name = name;
        this.password = password;
    }
}
