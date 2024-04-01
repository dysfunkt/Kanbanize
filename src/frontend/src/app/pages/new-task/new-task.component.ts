import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { Task } from '../../models/task.model';
import { Column } from '../../models/column.model';
import { TaskCard } from '../../models/taskcard.model';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss'
})
export class NewTaskComponent implements OnInit{

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) {}

  boardId!: string;
  column!: Column;
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.boardId = params['boardId']
        this.taskService.getColumn(this.boardId, params['columnId']).subscribe(next => {
          this.column = next as Column;
          this.taskService.getTaskCards(this.column._id).subscribe(next => {
            this.column.taskcards = next as TaskCard[];
          })
        })
      }
    )
  }

  createTask() {
    const titleInput: HTMLInputElement = document.getElementById('taskTitleInput') as HTMLInputElement;
    const dateInput: HTMLInputElement = document.getElementById('taskDateInput') as HTMLInputElement;
    const date: Date = new Date(dateInput.value)
    if (titleInput.value == '') {
      const titleDialog : HTMLDialogElement = document.getElementById('titleError') as HTMLDialogElement;
      titleDialog.show();
    } 
    else if (isNaN(date.getTime())) {
      const dateDialog : HTMLDialogElement = document.getElementById('dateError') as HTMLDialogElement;
      dateDialog.show();
    }
    else {
      this.taskService.createTaskCard(this.column._id, titleInput.value, new Number(this.column.taskcards.length), date).subscribe(() => {});
    this.router.navigate(['/kanban-view', this.boardId]);
    }
  }

  cancel() {
    this.router.navigate(['/kanban-view', this.boardId]);
  }

  close() {
    const titleDialog : HTMLDialogElement = document.getElementById('titleError') as HTMLDialogElement;
    const dateDialog : HTMLDialogElement = document.getElementById('dateError') as HTMLDialogElement;
    titleDialog.close();
    dateDialog.close()
  }
}
