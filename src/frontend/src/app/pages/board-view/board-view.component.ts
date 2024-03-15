import { Component } from '@angular/core';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-board-view',
  templateUrl: './board-view.component.html',
  styleUrl: './board-view.component.scss'
})
export class BoardViewComponent {

  constructor(private taskService: TaskService) {}

  createNewList() {
    this.taskService.createList('Testing').subscribe((response: any) => {
      console.log(response);
    })
  }
}
