import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Task } from '../../models/task.model';
import { List } from '../../models/list.model';

@Component({
  selector: 'app-board-view',
  templateUrl: './board-view.component.html',
  styleUrl: './board-view.component.scss'
})
export class BoardViewComponent implements OnInit{

  lists!: List[];
  tasks!: Task[];

  constructor(private taskService: TaskService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.taskService.getLists().subscribe(next => {
      
      this.lists = next as List[];
      
    })
    this.route.params.subscribe(
      (params: Params) => {
        console.log(params);
        if (params['listId'] == undefined) {
        } else {
          this.taskService.getTasks(params['listId']).subscribe(next => {
            this.tasks = next as Task[];
          })
        }
      }
    )
  }

  onTaskClick(task: Task) {
    this.taskService.complete(task).subscribe(() => {
      console.log("Completed Successfully");
      task.completed = !task.completed;
    })
  }
}
