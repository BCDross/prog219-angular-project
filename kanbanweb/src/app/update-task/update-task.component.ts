import { Component, OnInit } from '@angular/core';

import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss']
})
export class UpdateTaskComponent implements OnInit {
  tasks: Task[];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  delete(task: Task): void {
    this.tasks = this.tasks.filter((t) => t !== task);
    this.taskService.deleteTask(task).subscribe();
  }

  add(TaskName: string, Description: string, Creator: string, Owner: string, Status: string, Notes: string): void {
    TaskName = TaskName.trim();
    Description = Description.trim();
    Creator = Creator.trim();
    Owner = Owner.trim();
    Status = Status.trim();
    Notes = Notes.trim();
    if (!TaskName) {
      return;
    }
    this.taskService.addTask({ TaskName, Description, Creator, Owner, Status, Notes } as Task).subscribe((task) => {
      this.tasks.push(task);
    });
  }

}
