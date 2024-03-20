import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardViewComponent } from './pages/board-view/board-view.component';
import { KanbanViewComponent } from './pages/kanban-view/kanban-view.component';
import { NewListComponent } from './pages/new-list/new-list.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { ProjectListComponent } from './pages/project-list/project-list.component';

const routes: Routes = [
  { path: 'board-view', component: BoardViewComponent },
  { path: 'kanban-view', component: KanbanViewComponent },
  { path: 'project-list', component: ProjectListComponent },
  { path: 'new-list', component: NewListComponent },
  { path: 'new-task', component: NewTaskComponent },
  { path: 'lists', component: BoardViewComponent},
  { path: 'lists/:listId', component: BoardViewComponent},
  { path: 'lists/:listId/new-task', component: NewTaskComponent },
  { path: '', redirectTo: '/lists', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
