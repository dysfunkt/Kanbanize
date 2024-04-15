import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KanbanViewComponent } from './pages/kanban-view/kanban-view.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { NewProjectComponent } from './pages/new-project/new-project.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { DeleteTaskComponent } from './pages/delete-task/delete-task.component';
import { DeleteBoardComponent } from './pages/delete-board/delete-board.component';
import { LoginComponent } from './pages/login/login.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { ViewUsersComponent } from './pages/view-users/view-users.component';
import { CommentsComponent } from './pages/comments/comments.component';
import { AssignComponent } from './pages/assign/assign.component';


const routes: Routes = [
  { path: 'kanban-view', component: KanbanViewComponent },
  { path: 'kanban-view/:boardId', component: KanbanViewComponent },
  { path: 'project-list', component: ProjectListComponent },
  { path: 'new-task/:boardId/:columnId', component: NewTaskComponent },
  { path: 'edit-task/:boardId/:columnId/:taskcardId', component: EditTaskComponent },
  { path: 'delete-task/:boardId/:columnId/:taskcardId', component: DeleteTaskComponent },
  { path: 'comments/:boardId/:columnId/:taskcardId', component: CommentsComponent },
  { path: 'assign/:boardId/:columnId/:taskcardId', component: AssignComponent },
  { path: 'delete-board/:boardId', component: DeleteBoardComponent },
  { path: 'add-user/:boardId', component: AddUserComponent },
  { path: 'view-users/:boardId', component: ViewUsersComponent },
  { path: 'new-project', component: NewProjectComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'reset-password/:token', component: ResetPasswordComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
