import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardViewComponent } from './pages/board-view/board-view.component';

const routes: Routes = [
  { path: 'board-view', component: BoardViewComponent },
  { path: '', redirectTo: '/board-view', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
