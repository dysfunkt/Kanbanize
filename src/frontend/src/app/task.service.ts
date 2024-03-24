import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Task } from './models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webReqService: WebRequestService) { }

  getLists() {
    return this.webReqService.get('lists');
  }
  createList(title: string) {
    // send a web request to create a list
    return this.webReqService.post('lists', { title });
  }

  getTasks(listId: string) {
    return this.webReqService.get(`lists/${listId}/tasks`);
  }

  createTasks(title:string, listId: string) {
    return this.webReqService.post(`lists/${listId}/tasks`, { title })
  }
  
  complete(task: Task) {
    return this.webReqService.patch(`lists/${task._listId}/tasks/${task._id}`, {
      completed: !task.completed
    }); 
  }

  getBoards() {
    return this.webReqService.get('boards');
  }

  getBoard(boardId: string) {
    return this.webReqService.get(`boards/${boardId}`);
  }

  getColumns(boardId: string) {
    return this.webReqService.get(`boards/${boardId}/columns`);
  }

  createBoard(title: string) {
    // send a web request to create a list
    return this.webReqService.post('boards', { title });
  }

  createColumn(boardId:string, title: string) {
    // send a web request to create a list
    return this.webReqService.post(`boards/${boardId}/columns`, { title });
  }

  getTaskCards(boardId: string) {
    return this.webReqService.get(`boards/${boardId}/taskcards`);
  }
}
