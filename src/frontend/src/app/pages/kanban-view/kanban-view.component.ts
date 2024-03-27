import { Component, OnInit } from '@angular/core';
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



@Component({
  selector: 'app-kanban-view',
  templateUrl: './kanban-view.component.html',
  styleUrl: './kanban-view.component.scss'
})
export class KanbanViewComponent implements OnInit{

  board!: Board;

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
    for(var column of this.board.columns) {
      let index = 0
      for(var task of column.taskcards) {
        this.taskService.updateTaskCardPosition(task._columnId, task._id, column._id, index).subscribe(() => {});
        index++
      }
    }
    
  }
}
