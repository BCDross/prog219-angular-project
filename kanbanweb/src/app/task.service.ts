import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from './task';
import { MessageService } from './message.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('http://localhost:3000/tasks');
    this.messageService.add('Tasks Service: Tasks fetched');
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>('http://localhost:3000/tasks/' + id);
  }

  updateTask(task: Task): Observable<void> {
    return this.http.put<void>('http://localhost:3000/tasks/' + task.TaskID, task);
  }

  deleteTask(task: Task) {
    return this.http.delete('http://localhost:3000/tasks/' + task.TaskID);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>('http://localhost:3000/tasks', task);
  }
}
