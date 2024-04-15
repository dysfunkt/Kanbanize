export class Comment {
  constructor(
    public _id: string,
    public _taskcardId: string,
    public _userId: string,
    public username: string,
    public message: string,
    public date: Date
  ) {}
}
