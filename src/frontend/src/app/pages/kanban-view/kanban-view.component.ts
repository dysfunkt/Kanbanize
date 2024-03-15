import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { Board } from '../../models/board.model';
import { Column } from '../../models/column.model';


@Component({
  selector: 'app-kanban-view',
  templateUrl: './kanban-view.component.html',
  styleUrl: './kanban-view.component.scss'
})
export class KanbanViewComponent {

  board: Board = new Board('Test Board', [
    new Column('Backlog', [
      "Backlog 1",
      "This is another backlog",
      "Yet another backlog"
    ]), 
    new Column('In Progress', [
      "balls",
      "nuts",
      "deez"
    ]),
    new Column('Needs Review', [
      'Get to work', 
      'Pick up groceries', 
      'Go home', 
      'Fall asleep'
    ]),
    new Column('Completed', [
      'Get up', 
      'Brush teeth', 
      'Take a shower', 
      'Check e-mail', 
      'Walk dog'
    ])
  ])


  drop(event: CdkDragDrop<string[]>) {
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
