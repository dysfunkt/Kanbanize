import { TaskCard } from './taskcard.model';

export class Column {
  constructor(
    public _id: string,
    public _boardId: string,
    public title: string,
    public position: Number,
    public taskcards: TaskCard[]
  ) {}
}
