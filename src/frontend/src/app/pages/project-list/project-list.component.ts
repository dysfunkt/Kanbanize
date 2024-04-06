import { Component, HostListener, OnInit } from '@angular/core';
import { Board } from '../../models/board.model';
import { TaskService } from '../../task.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent implements OnInit{
  boards!: Board[];
  username!: string;
  constructor(private taskService: TaskService, private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit() { 
    this.taskService.getBoards().subscribe(next => {
      this.boards = next as Board[];

    })
    this.authService.getUsername().subscribe(next => {
      this.username = (next as User).username
    })
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
