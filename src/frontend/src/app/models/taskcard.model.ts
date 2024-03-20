export class TaskCard {
  constructor(
    public _id: string,
    public _boardId: string,
    public title: string,
    public status: Number,
    public position: Number,
    public description: string
  ) {}
}
