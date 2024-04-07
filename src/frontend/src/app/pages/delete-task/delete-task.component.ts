import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskCard } from '../../models/taskcard.model';
import { AuthService } from '../../auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrl: './delete-task.component.scss'
})
export class DeleteTaskComponent implements OnInit{
  username!: string;
  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router, private authService: AuthService ) {}
  boardId!: string;
  taskcard!: TaskCard
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

  deleteTaskcard() {
    this.taskService.deleteTaskCard(this.taskcard._columnId, this.taskcard._id).subscribe(() => {});
    this.router.navigate(['/kanban-view', this.boardId]);
  }

  logout() {
    this.authService.logout()
  }
}
