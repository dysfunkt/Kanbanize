import { Component, HostListener, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { Board } from '../../models/board.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrl: './view-users.component.scss'
})
export class ViewUsersComponent implements OnInit{
  constructor(private taskService: TaskService, private router: Router, private authService: AuthService, private route: ActivatedRoute) {  }

  username!: string;

  userIds!: any[];

  users: User[] = [];

  ngOnInit() { 
    this.route.params.subscribe(
      (params: Params) => {
        this.taskService.getUsers(params['boardId']).subscribe(next => {
          this.userIds = next as string[];
          this.usersInit()
        })
      }
    )
    this.authService.getUsername().subscribe(next => {
      this.username = (next as User).username
    })
  }

  usersInit() {
    for (var id of this.userIds) {
      this.authService.getUsernameWithId(id['_userId']).subscribe(next => {
        let user = next as User
        this.users.push(user);
        
      })
    }
  }

  cancel() {
    this.route.params.subscribe(
      (params: Params) => {
        this.router.navigate(['/kanban-view', params['boardId']]);
      }
    )
  }
  logout() {
    this.authService.logout()
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const navDropdown: HTMLDivElement = document.getElementById("navbarDropdown") as HTMLDivElement;
    if (navDropdown) {
      if(event.target == document.getElementById("navbarButton")) {
        if (navDropdown.classList.contains('is-active')){
          navDropdown.classList.remove('is-active')
        } else {
          navDropdown.classList.add('is-active')
        }
      } else {
        if (navDropdown.classList.contains('is-active')) {
          navDropdown.classList.remove('is-active')
        }
      }
    }
    
  }
}
