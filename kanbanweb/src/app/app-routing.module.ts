import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { TasksComponent } from './tasks/tasks.component';
import { ArchivedTasksComponent } from './archived-tasks/archived-tasks.component';
import { UpdateTaskComponent } from './update-task/update-task.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'archivedtasks', component: ArchivedTasksComponent },
  { path: 'updatetask', component: UpdateTaskComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
