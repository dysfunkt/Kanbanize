import { Column } from "./column.model";

export class Board {
    constructor(public title: string, public columns: Column[]) {}
}