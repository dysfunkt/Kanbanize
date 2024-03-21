import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardViewComponent } from './pages/board-view/board-view.component';
import { KanbanViewComponent } from './pages/kanban-view/kanban-view.component';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { HttpClientModule } from '@angular/common/http';
import { NewListComponent } from './pages/new-list/new-list.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { NewProjectComponent } from './pages/new-project/new-project.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardViewComponent,
    KanbanViewComponent,
    NewListComponent,
    NewTaskComponent,
    ProjectListComponent,
    NewProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
