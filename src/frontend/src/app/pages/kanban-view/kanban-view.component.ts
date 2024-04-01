import { Component, HostListener, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { Board } from '../../models/board.model';
import { TaskService } from '../../task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Column } from '../../models/column.model';
import { TaskCard } from '../../models/taskcard.model';
import { formatDate } from '@angular/common';



@Component({
  selector: 'app-kanban-view',
  templateUrl: './kanban-view.component.html',
  styleUrl: './kanban-view.component.scss'
})
export class KanbanViewComponent implements OnInit{

  board!: Board;
  isActive: Boolean = false;

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() { 
    this.route.params.subscribe(
      (params: Params) => {
        if (params['boardId'] != undefined) {
          this.taskService.getBoard(params['boardId']).subscribe(next => {
            this.board = next as Board;
            this.columnInit(params['boardId']);
          })
        }
    });
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

  addTaskClick(column: Column) {
    this.route.params.subscribe(
      (params: Params) => {
        this.router.navigate(['/new-task', params['boardId'], column._id]);
    });
  }

  editTaskClick(taskcard: TaskCard) {
    this.route.params.subscribe(
      (params: Params) => {
        this.router.navigate(['/edit-task', params['boardId'], taskcard._columnId, taskcard._id]);
    });
  }

  editTitleClick() {
    const boardTitle: HTMLDivElement = document.getElementById('title-container') as HTMLDivElement;
    const titleInput: HTMLInputElement = document.getElementById('title-input') as HTMLInputElement;
    const editButton: HTMLButtonElement = document.getElementById('title-edit') as HTMLButtonElement;
    const saveButton: HTMLButtonElement = document.getElementById('title-save') as HTMLButtonElement;
    boardTitle.style.display = 'none';
    titleInput.style.display = 'block';
    titleInput.value = this.board.title;
    editButton.style.display = 'none';
    saveButton.style.display = 'block';
  }
  
  saveTitleClick() {
    const boardTitle: HTMLDivElement = document.getElementById('title-container') as HTMLDivElement;
    const titleInput: HTMLInputElement = document.getElementById('title-input') as HTMLInputElement;
    const editButton: HTMLButtonElement = document.getElementById('title-edit') as HTMLButtonElement;
    const saveButton: HTMLButtonElement = document.getElementById('title-save') as HTMLButtonElement;
    boardTitle.style.display = 'block';
    titleInput.style.display = 'none';
    editButton.style.display = 'block';
    saveButton.style.display = 'none';
    this.updateBoardTitle(titleInput.value);
  }
  
  drop(event: CdkDragDrop<TaskCard[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.updateAllTaskCards();
  }

  updateBoardTitle(title: string) {
    this.board.title = title;
    this.taskService.updateBoardTitle(this.board._id, title).subscribe(() => {});
  }

  updateAllTaskCards() {
    for(var column of this.board.columns) {
      let index = 0
      for(var task of column.taskcards) {
        this.taskService.updateTaskCardPosition(task._columnId, task._id, column._id, index).subscribe(() => {});
        index++
      }
    }
  }

  togglePriority(taskcard: TaskCard) {
    taskcard.priority = !taskcard.priority
    this.taskService.updateTaskCardPriority(taskcard._columnId, taskcard._id, taskcard.priority).subscribe(() => {});
  }

  deleteTaskcardConfirm(taskcard: TaskCard) {
    this.route.params.subscribe(
      (params: Params) => {
        this.router.navigate(['/delete-task', params['boardId'], taskcard._columnId, taskcard._id]);
    });
  }
  
  deleteBoardConfirm() {
    this.route.params.subscribe(
      (params: Params) => {
        this.router.navigate(['/delete-board', params['boardId']]);
    });
  }
  
  formatDate(date: Date) {
    if (!date) {
      return 'undefined'
    } else {
      return formatDate(date, 'dd/MM/yyyy', 'en-GB');
    }
    
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const dropdown: HTMLDivElement = document.getElementById("dropdown") as HTMLDivElement;
    if ((event.target == document.getElementById("dropdown-button") || event.target == document.getElementById("dropdown-icon"))) {
      if (dropdown.classList.contains('is-active')) {
        dropdown.classList.remove('is-active')
      } else
      dropdown.classList.add('is-active');
    } else {
      if (dropdown.classList.contains('is-active')) {
        dropdown.classList.remove('is-active')
      }
    }
  }
}
