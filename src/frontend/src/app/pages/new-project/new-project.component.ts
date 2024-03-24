import { Component } from '@angular/core';
import { TaskService } from '../../task.service';
import { Router } from '@angular/router';
import { Board } from '../../models/board.model';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrl: './new-project.component.scss'
})
export class NewProjectComponent {

  constructor(private taskService: TaskService, private router: Router) {  }
  createProject(title: string) {
    this.taskService.createBoard(title).subscribe(next => {
      const board: Board = next as Board;
      console.log(board);
      this.initColumns(board._id)
      //change this to /kanban-view/board._id
      this.router.navigate(['/project-list'])
    });
  }
  initColumns(boardId: string) {
    this.taskService.createColumn(boardId, "To Do").subscribe(() => {});
    this.taskService.createColumn(boardId, "In Progress").subscribe(() => {});
    this.taskService.createColumn(boardId, "Needs Review").subscribe(() => {});
    this.taskService.createColumn(boardId, "Complete").subscribe(() => {});
  }
}
