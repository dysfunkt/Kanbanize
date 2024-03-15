import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardViewComponent } from './pages/board-view/board-view.component';
import { KanbanViewComponent } from './pages/kanban-view/kanban-view.component';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    BoardViewComponent,
    KanbanViewComponent
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
