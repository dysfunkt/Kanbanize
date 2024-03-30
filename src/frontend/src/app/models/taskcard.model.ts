export class TaskCard {
  constructor(
    public _id: string,
    public _columnId: string,
    public title: string,
    public position: Number,
    public dueDate: Date,
    public priority: Boolean
  ) {}
}
