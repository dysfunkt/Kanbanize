import { Component, HostListener, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Board } from '../../models/board.model';
import { Column } from '../../models/column.model';
import { TaskCard } from '../../models/taskcard.model';
import { AuthService } from '../../auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-delete-board',
  templateUrl: './delete-board.component.html',
  styleUrl: './delete-board.component.scss'
})
export class DeleteBoardComponent implements OnInit{
  username!: string;
  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router, private authService: AuthService ) {}

  board!: Board;
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.taskService.getBoard(params['boardId']).subscribe(next => {
          this.board = next as Board
          this.columnInit(this.board._id)
        })
      }
    )
    this.authService.getUsername().subscribe(next => {
      this.username = (next as User).username
    })
  }

  columnInit(boardId:string) {
    this.taskService.getColumns(boardId).subscribe(next => {
      this.board.columns = (next as Column[]).sort((a,b) => a.position.valueOf() - b.position.valueOf());
      for (var column of this.board.columns) {
        this.taskInit(column);
      }
    })
  }
  taskInit(column: Column) { 
    this.taskService.getTaskCards(column._id).subscribe(next => {
      column.taskcards = (next as TaskCard[]).sort((a,b) => a.position.valueOf() - b.position.valueOf());
    })
  }

  cancel() {
    this.router.navigate(['/kanban-view', this.board._id]);
  }

  deleteBoard() {
    for(var column of this.board.columns) {
      for(var task of column.taskcards) {
        this.taskService.deleteTaskCard(task._columnId, task._id).subscribe(() => {});
      }
      this.taskService.deleteColumn(column._boardId, column._id).subscribe(() => {})
    }
    this.taskService.deleteBoard(this.board._id).subscribe(() => {});
    this.router.navigate(['project-list']);
  }
  
  logout() {
    this.authService.logout()
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const navDropdown: HTMLDivElement = document.getElementById("navbarDropdown") as HTMLDivElement;
    if (navDropdown) {
      if(event.target == document.getElementById("navbarButton")) {
        if (navDropdown.classList.contains('is-active')){
          navDropdown.classList.remove('is-active')
        } else {
          navDropdown.classList.add('is-active')
        }
      } else {
        if (navDropdown.classList.contains('is-active')) {
          navDropdown.classList.remove('is-active')
        }
      }
    }
    
  }
}
