import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Board } from '../../models/board.model';

@Component({
  selector: 'app-delete-board',
  templateUrl: './delete-board.component.html',
  styleUrl: './delete-board.component.scss'
})
export class DeleteBoardComponent implements OnInit{
  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router, ) {}

  board!: Board;
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.taskService.getBoard(params['boardId']).subscribe(next => {
          this.board = next as Board
          console.log(this.board.title)
        })
      }
    )
  }

  cancel() {
    this.router.navigate(['/kanban-view', this.board._id]);
  }

  deleteBoard() {
    for(var column of this.board.columns) {
      for(var task of column.taskcards) {
        this.taskService.deleteTaskCard(task._columnId, task._id).subscribe(() => {});
      }
      this.taskService.deleteColumn(column._boardId, column._id).subscribe(() => {});
    }
    this.taskService.deleteBoard(this.board._id).subscribe(() => {});
    this.router.navigate(['project-list']);
  }
}
