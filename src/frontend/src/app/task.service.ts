import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Task } from './models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webReqService: WebRequestService) { }

  //list services
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
//kanban services
  getBoards() {
    return this.webReqService.get('boards');
  }

  getBoard(boardId: string) {
    return this.webReqService.get(`boards/${boardId}`);
  }

  getColumns(boardId: string) {
    return this.webReqService.get(`boards/${boardId}/columns`);
  }

  getColumn(boardId: string, columnId: string) {
    return this.webReqService.get(`boards/${boardId}/columns/${columnId}`);
  }

  createBoard(title: string) {
    // send a web request to create a list
    return this.webReqService.post('boards', { title });
  }

  createColumn(boardId:string, title: string, position: Number) {
    // send a web request to create a list
    return this.webReqService.post(`boards/${boardId}/columns`, { title, position });
  }

  getTaskCards(columnId: string) {
    return this.webReqService.get(`columns/${columnId}/taskcards`);
  }

  getTaskCard(columnId: string, taskcardId: string) {
    return this.webReqService.get(`columns/${columnId}/taskcards/${taskcardId}`);
  }

  createTaskCard(columnId:string, title: string, position: Number, date: Date) {
    return this.webReqService.post(`columns/${columnId}/taskcards`, { 
      title: title, 
      position: position,
      dueDate: date
    });
  }

  updateTaskCardDetails(columnId: string, taskcardId: string, title:string, date: Date) {
    return this.webReqService.patch(`columns/${columnId}/taskcards/${taskcardId}`, {
      title: title,
      dueDate: date
    })
  }
  
  updateTaskCardPriority(columnId: string, taskcardId: string, priority: Boolean) {
    return this.webReqService.patch(`columns/${columnId}/taskcards/${taskcardId}`, {
      priority: priority
    })
  }
  
  updateBoardTitle(boardId: string, title: string) {
    return this.webReqService.patch(`boards/${boardId}`, { title: title })
  }

  updateTaskCardPosition(columnId: string, taskcardId: string, newColumnId: string, position: Number) {
    return this.webReqService.patch(`columns/${columnId}/taskcards/${taskcardId}`, {
      _columnId: newColumnId,
      position: position
    })
  }

  deleteTaskCard(columnId: string, taskcardId: string) {
    return this.webReqService.delete(`columns/${columnId}/taskcards/${taskcardId}`)
  }

  deleteColumn(boardId: string, columnId: string) {
    return this.webReqService.delete(`boards/${boardId}/columns/${columnId}`)
  }

  deleteBoard(boardId: string) {
    return this.webReqService.delete(`boards/${boardId}`)
  }
}
