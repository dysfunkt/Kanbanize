import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskCard } from '../../models/taskcard.model';
import { formatDate } from '@angular/common';
import { AuthService } from '../../auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss'
})
export class EditTaskComponent implements OnInit {
  username!: string; 

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router, private authService: AuthService) {}

  boardId!: string;
  taskcard!: TaskCard;
  
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.boardId = params['boardId']
        this.taskService.getTaskCard(params['columnId'], params['taskcardId']).subscribe(next => {
          this.taskcard = next as TaskCard;
          console.log(this.taskcard.title)
        })
      }
    )
    this.authService.getUsername().subscribe(next => {
      this.username = (next as User).username
    })
  }

  cancel() {
    this.router.navigate(['/kanban-view', this.boardId]);
  }

  save() {
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
      this.taskService.updateTaskCardDetails(this.taskcard._columnId, this.taskcard._id, titleInput.value, date).subscribe(() => {});
    this.router.navigate(['/kanban-view', this.boardId]);
    }
  }

  close() {
    const titleDialog : HTMLDialogElement = document.getElementById('titleError') as HTMLDialogElement;
    const inputLengthDialog : HTMLDialogElement = document.getElementById('inputLengthError') as HTMLDialogElement;
    const dateDialog : HTMLDialogElement = document.getElementById('dateError') as HTMLDialogElement;
    titleDialog.close();
    inputLengthDialog.close();
    dateDialog.close()
    
  }

  formatDate(date: Date) {
    return formatDate(date, 'yyyy-MM-dd', 'en-GB');
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
