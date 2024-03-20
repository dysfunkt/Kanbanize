import { TaskCard } from "./taskcard.model";

export class Column {
    constructor(public name: string, public taskcards: TaskCard[]) {}
}