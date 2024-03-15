import { Component } from '@angular/core';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrl: './new-list.component.scss'
})
export class NewListComponent {

  constructor(private taskService: TaskService) { }

  createList(title:string) {
    this.taskService.createList(title).subscribe((response: any) => {
      console.log(response);
      //navigate to /lists/response._id
    })
  }

}
