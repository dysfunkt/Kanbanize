import { TaskCard } from "./taskcard.model";

export class Column {
    constructor(public title: string, public taskcards: TaskCard[]) {}
}