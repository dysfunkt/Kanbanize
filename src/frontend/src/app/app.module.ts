import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardViewComponent } from './pages/board-view/board-view.component';
import { KanbanViewComponent } from './pages/kanban-view/kanban-view.component';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { LoginComponent } from './pages/login/login.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NewListComponent } from './pages/new-list/new-list.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { NewProjectComponent } from './pages/new-project/new-project.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { DeleteTaskComponent } from './pages/delete-task/delete-task.component';
import { DeleteBoardComponent } from './pages/delete-board/delete-board.component';
import { WebReqInterceptor } from './web-req.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    BoardViewComponent,
    KanbanViewComponent,
    NewListComponent,
    NewTaskComponent,
    ProjectListComponent,
    NewProjectComponent,
    EditTaskComponent,
    DeleteTaskComponent,
    DeleteBoardComponent,
    LoginComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: WebReqInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
