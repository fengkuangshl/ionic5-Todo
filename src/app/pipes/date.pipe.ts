import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: any, args: string): any {
    value = value + ''; // make sure it's a string
    const date = new Date(value);
    // args = args + '';
    if (!args) {
      const now = new Date();
      if (date.getDate() === now.getDate()) {
        args = 'hh:mm';
      } else {
        args = 'MM-dd';
      }
    }
    const o = {
      'M+': date.getMonth() + 1,                 // 月份
      'd+': date.getDate(),                    // 日
      'h+': date.getHours(),                   // 小时
      'm+': date.getMinutes(),                 // 分
      's+': date.getSeconds(),                 // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      S: date.getMilliseconds()             // 毫秒
    };
    if (/(y+)/.test(args)) {
      args = args.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (const k in o) {
      if (new RegExp('(' + k + ')').test(args)) {
        args = args.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
      }
    }
    return args;
  }

}
