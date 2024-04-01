import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardViewComponent } from './pages/board-view/board-view.component';
import { KanbanViewComponent } from './pages/kanban-view/kanban-view.component';
import { NewListComponent } from './pages/new-list/new-list.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { NewProjectComponent } from './pages/new-project/new-project.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { DeleteTaskComponent } from './pages/delete-task/delete-task.component';
import { DeleteBoardComponent } from './pages/delete-board/delete-board.component';
import { LoginComponent } from './pages/login/login.component';


const routes: Routes = [
  { path: 'board-view', component: BoardViewComponent },
  { path: 'kanban-view', component: KanbanViewComponent },
  { path: 'kanban-view/:boardId', component: KanbanViewComponent },
  { path: 'project-list', component: ProjectListComponent },
  { path: 'new-list', component: NewListComponent },
  { path: 'new-task/:boardId/:columnId', component: NewTaskComponent },
  { path: 'edit-task/:boardId/:columnId/:taskcardId', component: EditTaskComponent },
  { path: 'delete-task/:boardId/:columnId/:taskcardId', component: DeleteTaskComponent },
  { path: 'delete-board/:boardId', component: DeleteBoardComponent},
  { path: 'new-project', component: NewProjectComponent },
  { path: 'lists', component: BoardViewComponent},
  { path: 'lists/:listId', component: BoardViewComponent},
  { path: 'lists/:listId/new-task', component: NewTaskComponent },
  { path: '', redirectTo: '/project-list', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: '/kanban-view', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
