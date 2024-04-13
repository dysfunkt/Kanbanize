import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { Column } from '../../models/column.model';
import { TaskCard } from '../../models/taskcard.model';
import { AuthService } from '../../auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss'
})
export class NewTaskComponent implements OnInit{

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router, private authService: AuthService) {}

  boardId!: string;
  column!: Column;
  username!: string;
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
    this.authService.getUsername().subscribe(next => {
      this.username = (next as User).username
    })
  }

  createTask() {
    const titleInput: HTMLInputElement = document.getElementById('taskTitleInput') as HTMLInputElement;
    const dateInput: HTMLInputElement = document.getElementById('taskDateInput') as HTMLInputElement;
    const date: Date = new Date(dateInput.value)
    if (titleInput.value == '') {
      const titleDialog : HTMLDialogElement = document.getElementById('titleError') as HTMLDialogElement;
      titleDialog.show();
    } 
    else if (this.inputLengthCheck(titleInput.value, 250)) {
      const inputLengthDialog : HTMLDialogElement = document.getElementById('inputLengthError') as HTMLDialogElement;
      inputLengthDialog.show();
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
    const inputLengthDialog : HTMLDialogElement = document.getElementById('inputLengthError') as HTMLDialogElement;
    const dateDialog : HTMLDialogElement = document.getElementById('dateError') as HTMLDialogElement;
    titleDialog.close();
    inputLengthDialog.close();
    dateDialog.close()
  }
  
  inputLengthCheck(input: string, length: number) {
    if (input.length > length) {
      return true;
    } else return false;
  }

  logout() {
    this.authService.logout()
  }
}
