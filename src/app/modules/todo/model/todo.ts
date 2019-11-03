/**
 * Todo model
 */
export class Todo {
    id: string;
    title: string;   // 标题
    description: string; // 内容
    completed = false; // 是否完成
    createDate: Date = new Date(); // 创建时间
    lastUpdateDate: Date = new Date(); // 更新时间

    constructor(title: string, description: string) {
        this.title = title;
        this.description = description;
    }
}
