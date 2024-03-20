import { Component, OnInit } from '@angular/core';
import { Board } from '../../models/board.model';
import { TaskService } from '../../task.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent implements OnInit{
  boards!: Board[];
  
  constructor(private taskService: TaskService, private route: ActivatedRoute) {}

  ngOnInit() { 
    this.taskService.getBoards().subscribe(next => {
      this.boards = next as Board[];

    })
  }
}
