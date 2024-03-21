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
import { ActivatedRoute, Params } from '@angular/router';
import { Column } from '../../models/column.model';
import { TaskCard } from '../../models/taskcard.model';



@Component({
  selector: 'app-kanban-view',
  templateUrl: './kanban-view.component.html',
  styleUrl: './kanban-view.component.scss'
})
export class KanbanViewComponent implements OnInit{

  board!: Board;
  columns!: Column[];
  taskscards!: TaskCard[];

  constructor(private taskService: TaskService, private route: ActivatedRoute) {}

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
      this.columns = next as Column[];
    })
  }
  
  onAddColumnClick() {
    console.log('click');
    let newColumn = new Column("New Column", [])
    this.columns.push(newColumn);
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
  }
}
