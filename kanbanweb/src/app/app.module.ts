import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ArchivedTasksComponent } from './archived-tasks/archived-tasks.component';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { TasksComponent } from './tasks/tasks.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    HomeComponent,
    MessagesComponent,
    ArchivedTasksComponent,
    UpdateTaskComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
